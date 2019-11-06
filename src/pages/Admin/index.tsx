import React, { useState } from 'react';
import styled from 'styled-components';
import Container from '../../utils/ContainerUtils/Container';
import AdminLayout from '../../layouts/AdminLayout';
import ProblemTable from '../../components/Admin/ProblemTable';
import AdminMenuStatus, { AdminMenuStatusType } from '../../constants/AdminMenuStatus';
import UserTable from '../../components/Admin/UserTable';
import CreateEditor from '../../components/DraftEditor/CreateEditor';

const TitleStyle = styled.h1`
    margin: 1rem auto;
`;

const TextStyle = styled.span`
    font-size: 20px;
    font-weight: normal;
`;

const Admin: React.FC = () => {
    const [nowMenu, setNowMenu] = useState<AdminMenuStatusType>(AdminMenuStatus.ADMIN_PROBLEM);

    switch (nowMenu) {
        case AdminMenuStatus.ADMIN_VIEW:
            return (
                <AdminLayout setNowMenu={setNowMenu}>
                    <Container>
                        <TitleStyle>문제 관리</TitleStyle>

                        <ProblemTable />
                    </Container>
                </AdminLayout>
            );
        case AdminMenuStatus.ADMIN_PROBLEM:
            return (
                <AdminLayout setNowMenu={setNowMenu}>
                    <Container>
                        <TitleStyle>
                            문제 등록 <TextStyle>자격증은 학년, 학기 기타 카테고리입니다.</TextStyle>
                        </TitleStyle>

                        <CreateEditor />
                        <br />
                    </Container>
                </AdminLayout>
            );
        case AdminMenuStatus.ADMIN_USERBLOCK:
            return (
                <AdminLayout setNowMenu={setNowMenu}>
                    <Container>
                        <TitleStyle>유저 차단 설정</TitleStyle>

                        <UserTable />
                    </Container>
                </AdminLayout>
            );
        default:
            return (
                <AdminLayout setNowMenu={setNowMenu}>
                    <Container>
                        <p>AdminMenuStatus Error</p>
                    </Container>
                </AdminLayout>
            );
    }
};

export default Admin;
