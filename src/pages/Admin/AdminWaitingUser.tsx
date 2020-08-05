import React, { useCallback, useEffect, useState } from 'react';
import cogoToast from 'cogo-toast';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import FontedTitle from '../../atomics/Typography/FontedTitle';
import AdminLayout from '../../layouts/AdminLayout';
import Table from '../../components/Table';
import useSelect from '../../hooks/useSelect';
import useToken from '../../hooks/useToken';
import { getGraphQLError } from '../../api/errorHandler';
import ErrorCode from '../../error/ErrorCode';

const TableWrap = styled.div`
    margin-bottom: 1rem;
`;

const CheckboxWrapStyle = styled.div`
    text-align: center;
`;

const AllowButtonStyle = styled.button`
    margin-bottom: 15px;
    border: none;
    border-radius: 10px 0px 0px 10px;
    width: 150px;
    height: 35px;
    color: #ffffff;
    background: var(--color-blue);
    cursor: pointer;
`;

const DenyButtonStyle = styled.button`
    margin-bottom: 15px;
    border: none;
    border-radius: 0px 10px 10px 0px;
    width: 150px;
    height: 35px;
    color: #ffffff;
    background: var(--color-red);
    cursor: pointer;
`;

const GET_WAITINGUSER = gql`
    query {
        waitingUsers {
            email
            grade
            name
            isDeny
            createdAt
        }
    }
`;

const ALLOW_USER = gql`
    mutation($email: String!) {
        allowUser(email: $email) {
            email
        }
    }
`;

const DENY_USER = gql`
    mutation($email: String!) {
        denyUser(email: $email) {
            email
        }
    }
`;

const AdminWaitingUser: React.FC = () => {
    const refreshToken = useToken();

    const [waitingUserData, setWaitingUserData] = useState<[]>([]);
    const [check, rowManager] = useSelect();

    const { loading, error, data, refetch: refatchWaitingUser } = useQuery(GET_WAITINGUSER);
    const [allowUserQurey] = useMutation(ALLOW_USER);
    const [denyUserQurey] = useMutation(DENY_USER);

    const refreshWaitingUserList = useCallback(() => {
        if (loading) {
            cogoToast.loading('가입 요청 목록을 가져오고 있어요...', {
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

        setWaitingUserData(data.waitingUsers);
    }, [loading, error, data, refreshToken]);

    useEffect(() => {
        refreshWaitingUserList();
    }, [refreshWaitingUserList]);

    const allowUsers = () => {
        const { selected } = check;

        if (Object.keys(selected).length === 0) {
            cogoToast.warn('가입 수락 할 유저를 선택해주세요.');
            return;
        }

        const isReal = window.confirm(
            `${Object.keys(selected).length}명을 가입 수락 하시겠습니까? 가입 수락은 되돌릴 수 없습니다.`
        );

        if (!isReal) return;

        const allowPromise = Object.keys(selected).map((key: string) => {
            return new Promise((resolve, reject) => {
                if (!selected[key]) reject();

                allowUserQurey({
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

        Promise.all(allowPromise).then(async () => {
            rowManager.uncheckAllRow();
            const { data: newData } = await refatchWaitingUser();
            setWaitingUserData(newData.waitingUsers);
            cogoToast.success(`${Object.keys(selected).length}명 가입 수락 완료`);
        });
    };

    const denyUsers = () => {
        const { selected } = check;

        if (Object.keys(selected).length === 0) {
            cogoToast.warn('가입 거절 할 유저를 선택해주세요.');
            return;
        }

        const isReal = window.confirm(`${Object.keys(selected).length}명을 가입 거절 하시겠습니까?`);

        if (!isReal) return;

        const denyPromise = Object.keys(selected).map((key: string) => {
            return new Promise((resolve, reject) => {
                if (!selected[key]) reject();

                denyUserQurey({
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

        Promise.all(denyPromise).then(async () => {
            rowManager.uncheckAllRow();
            const { data: newData } = await refatchWaitingUser();
            setWaitingUserData(newData.waitingUsers);
            cogoToast.success(`${Object.keys(selected).length}명 가입 거절 완료`);
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
                          onChange={() => rowManager.toggleAllRow(waitingUserData, 'email')}
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
            Header: '가입 상태',
            accessor: 'isAdmin',
            Cell: ({ row }: any) => {
                return row.original.isDeny ? '거절' : '대기 중';
            }
        },
        {
            Header: '가입 요청일',
            accessor: 'createdAt',
            Cell: ({ row }: any) => {
                return new Date(parseInt(row.original.createdAt, 10)).toLocaleDateString();
            }
        }
    ];

    return (
        <AdminLayout>
            <Helmet>
                <title>가입 요청 - 수프트</title>
            </Helmet>

            <FontedTitle>가입 요청</FontedTitle>
            <div>
                <AllowButtonStyle onClick={allowUsers}>수락</AllowButtonStyle>
                <DenyButtonStyle onClick={denyUsers}>거절</DenyButtonStyle>
            </div>

            <TableWrap>
                <Table columns={columns} data={waitingUserData} />
            </TableWrap>
        </AdminLayout>
    );
};

export default AdminWaitingUser;
