import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';
import config from '../../../constants/config';
import SubjectToString from '../../../utils/SubjectToString';
import useSelect from '../../../hooks/useSelect';

const TableWrap = styled.div`
    .ReactTable {
        background-color: #ffffff;
    }
`;

const CheckboxWrapStyle = styled.div`
    text-align: center;
`;

const EditButtonStyle = styled.button`
    margin-bottom: 15px;
    border: none;
    border-radius: 10px;
    width: 150px;
    height: 35px;
    color: #ffffff;
    background: var(--color-blue);
    cursor: pointer;
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

const ProblemTable: React.FC<RouteComponentProps> = ({ history }) => {
    const [data, setData] = useState<[]>();
    const [check, setRow] = useSelect();

    const refresh = () => {
        axios
            .get(`${config.ENDPOINT}/problem/all`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                if (!res.data.success) {
                    alert(res.data.message);
                } else {
                    setData(res.data.problems);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        refresh();
    }, []);

    const updateProblem = () => {
        if (Object.keys(check.selected).length === 0) {
            alert('수정할 문제를 선택해주세요.');
            return;
        }

        if (Object.keys(check.selected).length !== 1) {
            alert('수정할 문제가 2개 이상입니다. 1개만 선택해주세요.');
            return;
        }

        for (const item in check.selected) {
            if (check.selected[item]) {
                history.push(`/admin/edit/${item}`);
                return;
            }
        }
    };

    const updateProblemById = (id: number) => {
        history.push(`/admin/edit/${id}`);
    };

    const deleteProblem = () => {
        if (Object.keys(check.selected).length === 0) {
            alert('삭제할 문제를 선택해주세요.');
            return;
        }

        const isRealDelete = window.confirm('정말로 삭제 하시겠습니까?');

        if (isRealDelete) {
            for (const item in check.selected) {
                if (check.selected[item]) {
                    axios
                        .delete(`${config.endpoint}/problem/delete/${item}`, {
                            headers: {
                                Authorization: `JWT ${localStorage.getItem('token')}`
                            }
                        })
                        .then((res) => {
                            if (!res.data.success) {
                                alert(res.data.message);
                            } else {
                                refresh();

                                setRow.uncheckAllRow();
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }

            alert('삭제 완료!');
        }
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
                                    input.indeterminate = check.selectAll === 2;
                                }
                            }}
                          onChange={() => setRow.toggleAllRow(data, 'id')}
                        />
                    </CheckboxWrapStyle>
                );
            },
            Cell: ({ original }: any) => {
                return (
                    <CheckboxWrapStyle>
                        <input type="checkbox" checked={check.selected[original.id]} onChange={() => setRow.toggleRow(original.id)} />
                    </CheckboxWrapStyle>
                );
            },
            sortable: false,
            width: 45
        },
        {
            columns: [
                {
                    Header: '#',
                    accessor: 'id',
                    width: 45
                }
            ]
        },
        {
            Header: '작성자',
            columns: [
                {
                    Header: '작성자',
                    width: 150,
                    accessor: 'author'
                }
            ]
        },
        {
            Header: '문제',
            columns: [
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
                }
            ]
        },
        {
            Header: '카테고리',
            columns: [
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
                &nbsp;
                <DeleteButtonStyle onClick={deleteProblem}>삭제</DeleteButtonStyle>
                <span> * 문제 표시 칸을 클릭하여 바로 수정 페이지로 들어갈 수 있습니다.</span>
            </div>

            <TableWrap>
                <ReactTable
                  data={data}
                  columns={columns}
                  defaultPageSize={10}
                  className="-highlight"
                  getTdProps={(state: any, rowInfo: any, column: any) => {
                        return {
                            onClick: () => {
                                if (rowInfo !== undefined && column.Header === '문제') {
                                    updateProblemById(rowInfo.original.id);
                                }
                            }
                        };
                    }}
                />
            </TableWrap>
        </>
    );
};

export default withRouter(ProblemTable);
