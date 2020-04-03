import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import cogoToast from 'cogo-toast';
import useSelect from '../../../hooks/useSelect';
import WaitingApi from '../../../api/Waiting';

const TableWrap = styled.div`
    .ReactTable {
        background-color: #ffffff;
    }

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

const WaitingUserTable: React.FC = () => {
    const [data, setData] = useState<[]>();
    const [check, rowManager] = useSelect();

    const refreshWaitingUserList = () => {
        WaitingApi.all().then((res) => {
            setData(res.data.data);
        });
    };

    useEffect(() => {
        refreshWaitingUserList();
    }, []);

    const allowUsers = () => {
        const { selected } = check;

        if (Object.keys(selected).length === 0) {
            cogoToast.warn('가입 수락 할 유저를 선택해주세요.');
            return;
        }

        const isReal = window.confirm(`${Object.keys(selected).length}명을 가입 수락 하시겠습니까?\n가입 수락은 되돌릴 수 없습니다.`);

        if (!isReal) return;

        Object.keys(selected).forEach((key: string) => {
            if (!selected[key]) return;

            WaitingApi.allow(key).then(() => {
                refreshWaitingUserList();
                rowManager.uncheckAllRow();
            });
        });

        cogoToast.success(`${Object.keys(selected).length}명 가입 수락 완료`);
    };

    const denyUsers = () => {
        const { selected } = check;

        if (Object.keys(selected).length === 0) {
            cogoToast.warn('가입 거절 할 유저를 선택해주세요.');
            return;
        }

        const isReal = window.confirm(`${Object.keys(selected).length}명을 가입 거절 하시겠습니까?`);

        if (!isReal) return;

        Object.keys(selected).forEach((key: string) => {
            if (!selected[key]) return;

            WaitingApi.deny(key).then(() => {
                refreshWaitingUserList();
                rowManager.uncheckAllRow();
            });
        });

        cogoToast.success(`${Object.keys(selected).length}명 가입 거절 완료`);
    };

    const columns = [
        {
            columns: [
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
                                  onChange={() => rowManager.toggleAllRow(data, 'email')}
                                />
                            </CheckboxWrapStyle>
                        );
                    },
                    Cell: ({ original }: any) => {
                        return (
                            <CheckboxWrapStyle>
                                <input type="checkbox" checked={check.selected[original.email]} onChange={() => rowManager.toggleRow(original.email)} />
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
                    Cell: ({ original }: any) => {
                        return original.isDeny ? '거절' : '대기 중';
                    }
                },
                {
                    Header: '가입 요청일',
                    accessor: 'createdAt'
                }
            ]
        }
    ];

    return (
        <>
            <div>
                <AllowButtonStyle onClick={allowUsers}>수락</AllowButtonStyle>
                <DenyButtonStyle onClick={denyUsers}>거절</DenyButtonStyle>
            </div>

            <TableWrap>
                <ReactTable data={data} columns={columns} defaultPageSize={20} className="-highlight" />
            </TableWrap>
        </>
    );
};

export default WaitingUserTable;
