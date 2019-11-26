import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';
import config from '../../../constants/config';
import { useProfile } from '../../../hooks/useProfile';
import useSelect from '../../../hooks/useSelect';

const TableWrap = styled.div`
    .ReactTable {
        background-color: #ffffff;
    }
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

const UserTable: React.FC = () => {
    const [data, setData] = useState<[]>();
    const [check, setRow] = useSelect();
    const profile = useProfile();

    const refresh = () => {
        axios
            .get(`${config.ENDPOINT}/user/all`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                if (!res.data.success) {
                    alert(res.data.message);
                } else {
                    setData(res.data.users);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        refresh();
    }, []);

    const blockUsers = () => {
        if (Object.keys(check.selected).length === 0) {
            alert('차단 할 유저를 선택해주세요.');
            return;
        }

        const isReal = window.confirm(`${Object.keys(check.selected).length}명을 차단 하시겠습니까?`);

        if (isReal) {
            for (const item in check.selected) {
                if (check.selected[item]) {
                    if (item === profile.email) {
                        alert('자기 자신을 차단 할 수 없습니다.');
                        return;
                    }

                    axios
                        .put(
                            `${config.ENDPOINT}/user/block`,
                            { email: item },
                            {
                                headers: {
                                    Authorization: `JWT ${localStorage.getItem('token')}`
                                }
                            }
                        )
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

            alert(`${Object.keys(check.selected).length}명 차단 완료`);
        }
    };

    const unBlockUsers = () => {
        if (Object.keys(check.selected).length === 0) {
            alert('차단 해제 할 유저를 선택해주세요.');
            return;
        }

        const isReal = window.confirm(`${Object.keys(check.selected).length}명을 차단 해제 하시겠습니까?`);

        if (isReal) {
            for (const item in check.selected) {
                if (check.selected[item]) {
                    axios
                        .put(
                            `${config.ENDPOINT}/user/unblock`,
                            { email: item },
                            {
                                headers: {
                                    Authorization: `JWT ${localStorage.getItem('token')}`
                                }
                            }
                        )
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

            alert(`${Object.keys(check.selected).length}명 차단 해제 완료`);
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
                          onChange={() => setRow.toggleAllRow(data, 'email')}
                        />
                    </CheckboxWrapStyle>
                );
            },
            Cell: ({ original }: any) => {
                return (
                    <CheckboxWrapStyle>
                        <input type="checkbox" checked={check.selected[original.email]} onChange={() => setRow.toggleRow(original.email)} />
                    </CheckboxWrapStyle>
                );
            },
            sortable: false,
            width: 45
        },
        {
            Header: '계정정보',
            columns: [
                {
                    Header: '이메일',
                    accessor: 'email',
                    width: 250
                },
                {
                    Header: '이름',
                    accessor: 'name'
                }
            ]
        },
        {
            Header: '상세정보',
            columns: [
                {
                    Header: '학년',
                    accessor: 'grade'
                },
                {
                    Header: '관리자 여부',
                    accessor: 'isAdmin',
                    Cell: ({ original }: any) => {
                        return original.isAdmin ? 'YES' : 'NO';
                    }
                },
                {
                    Header: '차단 여부',
                    accessor: 'isBlocked',
                    Cell: ({ original }: any) => {
                        return original.isBlocked ? 'YES' : 'NO';
                    }
                },
                {
                    Header: '최고 관리자 여부',
                    accessor: 'root',
                    Cell: ({ original }: any) => {
                        return original.root ? 'YES' : 'NO';
                    }
                }
            ]
        }
    ];

    return (
        <>
            <div>
                <BlockButtonStyle onClick={blockUsers}>차단</BlockButtonStyle>
                <UnBlockButtonStyle onClick={unBlockUsers}>차단 해제</UnBlockButtonStyle>
                <span> * 차단 시 해당 유저는 로그인이 불가능합니다.</span>
            </div>

            <TableWrap>
                <ReactTable data={data} columns={columns} defaultPageSize={10} className="-highlight" />
            </TableWrap>
        </>
    );
};

export default UserTable;
