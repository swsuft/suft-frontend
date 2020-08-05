import React, { useCallback, useEffect, useState } from 'react';
import cogoToast from 'cogo-toast';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import FontedTitle from '../../atomics/Typography/FontedTitle';
import AdminLayout from '../../layouts/AdminLayout';
import useSelect from '../../hooks/useSelect';
import { useProfile } from '../../hooks/useProfile';
import Table from '../../components/Table';
import useToken from '../../hooks/useToken';
import { getGraphQLError } from '../../api/errorHandler';
import ErrorCode from '../../error/ErrorCode';

const TableWrap = styled.div`
    margin-bottom: 1rem;
`;

const CheckboxWrapStyle = styled.div`
    text-align: center;
`;

const BlockButtonStyle = styled.button`
    margin-bottom: 15px;
    border: none;
    border-radius: 10px 0px 0px 10px;
    width: 150px;
    height: 35px;
    color: #ffffff;
    background: var(--color-red);
    cursor: pointer;
`;

const UnBlockButtonStyle = styled.button`
    margin-bottom: 15px;
    border: none;
    border-radius: 0px 10px 10px 0px;
    width: 150px;
    height: 35px;
    color: #ffffff;
    background: var(--color-blue);
    cursor: pointer;
`;

const GET_USERS = gql`
    query {
        users {
            email
            name
            grade
            isAdmin
            isBlocked
            createdAt
            updatedAt
            registeredAt
        }
    }
`;

const BLOCK_USER = gql`
    mutation($email: String!) {
        blockUser(email: $email) {
            email
        }
    }
`;

const UNBLOCK_USER = gql`
    mutation($email: String!) {
        unBlockUser(email: $email) {
            email
        }
    }
`;

const AdminUserView: React.FC = () => {
    const refreshToken = useToken();

    const [userData, setUserData] = useState<[]>([]);
    const [check, rowManager] = useSelect();
    const profile = useProfile();

    const { loading, error, data, refetch: refetchUsers } = useQuery(GET_USERS);
    const [blockUserQurey] = useMutation(BLOCK_USER);
    const [unBlockUserQurey] = useMutation(UNBLOCK_USER);

    const refreshUser = useCallback(() => {
        if (loading) {
            cogoToast.loading('유저를 가져오고 있어요...', {
                hideAfter: 1
            });
            return;
        }

        if (error) {
            const gerror = getGraphQLError(error);
            if (!gerror) return;

            if (gerror[0] === ErrorCode.NO_PERMISSION) {
                refreshToken();
            } else {
                cogoToast.error(gerror[1]);
            }

            return;
        }

        setUserData(data.users);
    }, [loading, error, data, refreshToken]);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const blockUsers = () => {
        const { selected } = check;

        if (Object.keys(selected).length === 0) {
            cogoToast.warn('차단 할 유저를 선택해주세요.');
            return;
        }

        const isReal = window.confirm(`${Object.keys(selected).length}명을 차단 하시겠습니까?`);

        if (!isReal) return;

        if (Object.keys(selected).includes(profile!!.email)) {
            cogoToast.error('자기 자신은 차단 할 수 없습니다.');
            return;
        }

        const blockPromise = Object.keys(selected).map((key: string) => {
            return new Promise((resolve, reject) => {
                if (!selected[key]) reject();

                blockUserQurey({
                    variables: {
                        email: key
                    }
                })
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        const gerror = getGraphQLError(err);
                        if (!gerror) return;
                        reject(gerror[1]);
                    });
            });
        });

        Promise.all(blockPromise).then(async () => {
            rowManager.uncheckAllRow();
            const { data: newData } = await refetchUsers();
            setUserData(newData.users);

            cogoToast.success(`${Object.keys(selected).length}명 차단 완료`);
        });
    };

    const unBlockUsers = () => {
        const { selected } = check;

        if (Object.keys(selected).length === 0) {
            cogoToast.warn('차단 해제 할 유저를 선택해주세요.');
            return;
        }

        const isReal = window.confirm(`${Object.keys(selected).length}명을 차단 해제 하시겠습니까?`);

        if (!isReal) return;

        const unBlockPromise = Object.keys(selected).map((key: string) => {
            return new Promise((resolve, reject) => {
                if (!selected[key]) reject();

                unBlockUserQurey({
                    variables: {
                        email: key
                    }
                })
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        const gerror = getGraphQLError(err);
                        if (!gerror) return;
                        reject(gerror[1]);
                    });
            });
        });

        Promise.all(unBlockPromise).then(async () => {
            rowManager.uncheckAllRow();
            const { data: newData } = await refetchUsers();
            setUserData(newData.users);

            cogoToast.success(`${Object.keys(selected).length}명 차단 해제 완료`);
        });
    };

    const columns = [
        {
            id: 'checkbox',
            accessor: 'checkbox',
            Header: () => {
                return (
                    <CheckboxWrapStyle>
                        <input
                          type="checkbox"
                          checked={check.selectAll === 1}
                          ref={(input) => {
                                if (input) {
                                    // eslint-disable-next-line
                                    input.indeterminate = check.selectAll === 2;
                                }
                            }}
                          onChange={() => rowManager.toggleAllRow(userData, 'email')}
                        />
                    </CheckboxWrapStyle>
                );
            },
            Cell: ({ row }: any) => {
                return (
                    <CheckboxWrapStyle>
                        <input
                          type="checkbox"
                          checked={check.selected[row.original.email]}
                          onChange={() => rowManager.toggleRow(row.original.email)}
                        />
                    </CheckboxWrapStyle>
                );
            },
            sortable: false,
            width: 45
        },
        {
            Header: '이메일',
            accessor: 'email',
            width: 250
        },
        {
            Header: '이름',
            accessor: 'name'
        },
        {
            Header: '학년',
            accessor: 'grade'
        },
        {
            Header: '관리자',
            accessor: 'isAdmin',
            Cell: ({ row }: any) => {
                return row.original.isAdmin ? 'YES' : 'NO';
            }
        },
        {
            Header: '차단',
            accessor: 'isBlocked',
            Cell: ({ row }: any) => {
                return row.original.isBlocked ? 'YES' : 'NO';
            }
        },
        {
            Header: '가입 수락일',
            accessor: 'createdAt',
            Cell: ({ row }: any) => {
                return new Date(parseInt(row.original.createdAt, 10)).toLocaleDateString();
            }
        },
        {
            Header: '정보 변경일',
            accessor: 'updatedAt',
            Cell: ({ row }: any) => {
                return new Date(parseInt(row.original.updatedAt, 10)).toLocaleDateString();
            }
        },
        {
            Header: '가입 요청일',
            accessor: 'registeredAt',
            Cell: ({ row }: any) => {
                return new Date(parseInt(row.original.registeredAt, 10)).toLocaleDateString();
            }
        }
    ];

    return (
        <AdminLayout>
            <Helmet>
                <title>유저 관리 - 수프트</title>
            </Helmet>

            <FontedTitle>유저 관리</FontedTitle>
            <div>
                <BlockButtonStyle onClick={blockUsers}>차단</BlockButtonStyle>
                <UnBlockButtonStyle onClick={unBlockUsers}>차단 해제</UnBlockButtonStyle>
            </div>

            <TableWrap>
                <Table columns={columns} data={userData} />
            </TableWrap>
        </AdminLayout>
    );
};

export default AdminUserView;
