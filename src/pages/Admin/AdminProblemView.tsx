import React, { useCallback, useEffect, useState } from 'react';
import cogoToast from 'cogo-toast';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import underscore from 'underscore';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import FontedTitle from '../../atomics/Typography/FontedTitle';
import AdminLayout from '../../layouts/AdminLayout';
import useSelect from '../../hooks/useSelect';
import SubjectToString from '../../utils/SubjectToString';
import EditIcon from '../../atomics/Icons/EditIcon';
import Table from '../../components/Table';
import { getGraphQLError } from '../../api/errorHandler';
import ErrorCode from '../../error/ErrorCode';
import useToken from '../../hooks/useToken';

const TableWrapper = styled.div`
    margin-bottom: 1rem;
`;

const CheckBoxWrapper = styled.div`
    text-align: center;
`;

const DeleteButtonStyle = styled.button`
    margin-bottom: 15px;
    border: none;
    border-radius: 10px;
    width: 150px;
    height: 35px;
    color: #ffffff;
    background: var(--color-red);
    cursor: pointer;
`;

const GET_PROBLEM = gql`
    query {
        problems {
            id
            answer
            author
            contents
            email
            grade
            subject
            times
        }
    }
`;

const DELETE_PROBLEM = gql`
    mutation($id: Int!) {
        deleteProblem(id: $id) {
            id
        }
    }
`;

const AdminProblemView: React.FC<RouteComponentProps> = ({ history }) => {
    const refreshToken = useToken();

    const [problemData, setProblemData] = useState<[]>([]);
    const [check, rowManager] = useSelect();

    const { loading, error, data, refetch: refetchProblem } = useQuery(GET_PROBLEM);
    const [deleteProblemQuery] = useMutation(DELETE_PROBLEM);

    const refreshProblem = useCallback(() => {
        if (loading) {
            cogoToast.loading('지금 문제를 가져오고 있어요...', {
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
        }

        setProblemData(data.problems);
    }, [loading, error, data, refreshToken]);

    useEffect(() => {
        refreshProblem();
    }, [refreshProblem]);

    const deleteProblem = () => {
        const { selected } = check;
        if (Object.keys(selected).length === 0) {
            cogoToast.warn('삭제할 문제를 선택해주세요.');
            return;
        }

        const isRealDelete = window.confirm('정말로 삭제 하시겠습니까?');

        if (!isRealDelete) {
            return;
        }

        const deletePromise = Object.keys(selected).map((key: string) => {
            return new Promise((resolve, reject) => {
                deleteProblemQuery({
                    variables: {
                        id: parseInt(key, 10)
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

        Promise.all(deletePromise).then(async () => {
            rowManager.uncheckAllRow();
            await refetchProblem();
            refreshProblem();

            cogoToast.success(`${Object.keys(selected).length}개 문제 삭제 완료`);
        });
    };

    const columns = [
        {
            id: 'checkbox',
            accessor: 'checkbox',
            Header: () => {
                return (
                    <CheckBoxWrapper>
                        <input
                          type="checkbox"
                          checked={check.selectAll === 1}
                          ref={(input) => {
                                if (input) {
                                    // eslint-disable-next-line
                                    input.indeterminate = check.selectAll === 2;
                                }
                            }}
                          onChange={() => rowManager.toggleAllRow(data, 'id')}
                        />
                    </CheckBoxWrapper>
                );
            },
            Cell: ({ row }: any) => {
                return (
                    <CheckBoxWrapper>
                        <input
                          type="checkbox"
                          checked={check.selected[row.original.id]}
                          onChange={() => rowManager.toggleRow(row.original.id)}
                        />
                    </CheckBoxWrapper>
                );
            },
            sortable: false,
            width: 45
        },
        {
            Header: '#',
            accessor: 'id',
            width: 45
        },
        {
            Header: '작성자',
            width: 150,
            accessor: 'author'
        },
        {
            Header: '문제',
            width: 400,
            accessor: 'contents',
            Cell: ({ row }: any) => {
                return underscore.unescape(row.original.contents).replace(/(<([^>]+)>)/gi, '');
            }
        },
        {
            Header: '답',
            width: 150,
            accessor: 'answer'
        },
        {
            Header: '과목',
            width: 120,
            accessor: 'subject',
            Cell: ({ row }: any) => {
                return SubjectToString(row.original.subject);
            }
        },
        {
            Header: '학년',
            width: 80,
            accessor: 'grade'
        },
        {
            Header: '학기 및 차시',
            width: 100,
            accessor: 'times'
        },
        {
            Header: '문제 수정',
            Cell: ({ row }: any) => <EditIcon onClick={() => history.push(`/myproblem/edit/${row.original.id}`)} />
        }
    ];

    return (
        <AdminLayout>
            <FontedTitle>문제 관리</FontedTitle>
            <div>
                <DeleteButtonStyle onClick={deleteProblem}>삭제</DeleteButtonStyle>
            </div>

            <TableWrapper>
                <Table columns={columns} data={problemData} />
            </TableWrapper>
        </AdminLayout>
    );
};

export default withRouter(AdminProblemView);
