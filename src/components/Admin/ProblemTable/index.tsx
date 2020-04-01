import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ReactTable from 'react-table';
import SubjectToString from '../../../utils/SubjectToString';
import useSelect from '../../../hooks/useSelect';
import ProblemApi from '../../../api/Problem';

const TableWrapper = styled.div`
    .ReactTable {
        background-color: #ffffff;
    }

    margin-bottom: 1rem;
`;

const CheckBoxWrapper = styled.div`
    text-align: center;
`;

const EditButtonStyle = styled.button`
    margin-bottom: 15px;
    border: none;
    border-radius: 10px 0px 0px 10px;
    width: 150px;
    height: 35px;
    color: #ffffff;
    background: var(--color-blue);
    cursor: pointer;
`;

const DeleteButtonStyle = styled.button`
    margin-bottom: 15px;
    border: none;
    border-radius: 0px 10px 10px 0px;
    width: 150px;
    height: 35px;
    color: #ffffff;
    background: var(--color-red);
    cursor: pointer;
`;

const ProblemTable: React.FC<RouteComponentProps> = ({ history }) => {
    const [data, setData] = useState<[]>();
    const [check, rowManager] = useSelect();

    const refreshProblem = () => {
        ProblemApi.all().then((res) => {
            setData(res.data.data);
        });
    };

    useEffect(() => {
        refreshProblem();
    }, []);

    const updateProblem = () => {
        const { selected } = check;

        if (Object.keys(selected).length === 0) {
            alert('수정할 문제를 선택해주세요.');
            return;
        }

        if (Object.keys(selected).length !== 1) {
            alert('수정할 문제가 2개 이상입니다. 1개만 선택해주세요.');
            return;
        }

        Object.keys(check.selected).forEach((key: string) => {
            if (!selected[key]) return;
            history.push(`/admin/edit/${key}`);
        });
    };

    const deleteProblem = () => {
        const { selected } = check;
        if (Object.keys(selected).length === 0) {
            alert('삭제할 문제를 선택해주세요.');
            return;
        }

        const isRealDelete = window.confirm('정말로 삭제 하시겠습니까?');

        if (!isRealDelete) {
            return;
        }

        const deletePromise = Object.keys(selected).map((key: string) => {
            return new Promise((resolve, reject) => {
                ProblemApi.delete(key)
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        });

        Promise.all(deletePromise).then(() => {
            rowManager.uncheckAllRow();
            refreshProblem();

            alert(`${Object.keys(selected).length}개 문제 삭제 완료`);
        });
    };

    const columns = [
        {
            columns: [
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
                    Cell: ({ original }: any) => {
                        return (
                            <CheckBoxWrapper>
                                <input type="checkbox" checked={check.selected[original.id]} onChange={() => rowManager.toggleRow(original.id)} />
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
                    Cell: ({ original }: any) => {
                        return original.contents.replace(/(<([^>]+)>)/gi, '');
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
                    Cell: ({ original }: any) => {
                        return SubjectToString(original.subject);
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
                }
            ]
        }
    ];

    return (
        <>
            <div>
                <EditButtonStyle onClick={updateProblem}>수정</EditButtonStyle>
                <DeleteButtonStyle onClick={deleteProblem}>삭제</DeleteButtonStyle>
                <span> * 문제 표시 칸을 클릭하여 바로 수정 페이지로 들어갈 수 있습니다.</span>
            </div>

            <TableWrapper>
                <ReactTable
                  data={data}
                  columns={columns}
                  defaultPageSize={20}
                  className="-highlight"
                  getTdProps={(state: any, rowInfo: any, column: any) => {
                        return {
                            onClick: () => {
                                if (rowInfo !== undefined && column.Header === '문제') {
                                    history.push(`/admin/edit/${rowInfo.original.id}`);
                                }
                            }
                        };
                    }}
                />
            </TableWrapper>
        </>
    );
};

export default withRouter(ProblemTable);
