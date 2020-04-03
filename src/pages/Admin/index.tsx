import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Container from '../../utils/ContainerUtils/Container';
import AdminLayout from '../../layouts/AdminLayout';
import AdminMenuStatus, { AdminMenuStatusType } from '../../constants/AdminMenuStatus';
import CreateEditor from '../../components/AdminEditor/CreateEditor';
import ProblemTable from '../../components/Admin/ProblemTable';
import UserTable from '../../components/Admin/UserTable';
import WaitingUserTable from '../../components/Admin/WaitingUserTable';

const AdminTitleStyle = styled.h1`
    margin: 1rem auto;
`;

const Admin: React.FC = () => {
    const [nowMenu, setNowMenu] = useState<AdminMenuStatusType>(AdminMenuStatus.ADMIN_PROBLEM);

    const renderBody = useCallback(() => {
        switch (nowMenu) {
            case AdminMenuStatus.ADMIN_PROBLEM:
                return (
                    <>
                        <AdminTitleStyle>문제 등록</AdminTitleStyle>
                        <CreateEditor />
                    </>
                );
            case AdminMenuStatus.ADMIN_VIEW:
                return (
                    <>
                        <AdminTitleStyle>문제 관리</AdminTitleStyle>
                        <ProblemTable />
                    </>
                );
            case AdminMenuStatus.ADMIN_USERBLOCK:
                return (
                    <>
                        <AdminTitleStyle>유저 관리</AdminTitleStyle>
                        <UserTable />
                    </>
                );
            case AdminMenuStatus.ADMIN_WAITINGUSER:
                return (
                    <>
                        <AdminTitleStyle>가입 수락</AdminTitleStyle>
                        <WaitingUserTable />
                    </>
                );
            default:
                return <p>AdminMenuStatus Error</p>;
        }
    }, [nowMenu]);

    return (
        <AdminLayout setNowMenu={setNowMenu}>
            <Container>{renderBody()}</Container>
        </AdminLayout>
    );
};

export default Admin;
