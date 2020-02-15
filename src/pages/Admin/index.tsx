import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Container from '../../utils/ContainerUtils/Container';
import AdminLayout from '../../layouts/AdminLayout';
import AdminMenuStatus, { AdminMenuStatusType } from '../../constants/AdminMenuStatus';
import CreateEditor from '../../components/DraftEditor/CreateEditor';
import ProblemTable from '../../components/Admin/ProblemTable';
import UserTable from '../../components/Admin/UserTable';

const TitleStyle = styled.h1`
    margin: 1rem auto;
`;

const TextStyle = styled.span`
    font-size: 20px;
    font-weight: normal;
`;

const Admin: React.FC = () => {
    const [nowMenu, setNowMenu] = useState<AdminMenuStatusType>(AdminMenuStatus.ADMIN_PROBLEM);

    const renderBody = useCallback(() => {
        switch (nowMenu) {
            case AdminMenuStatus.ADMIN_PROBLEM:
                return (
                    <>
                        <TitleStyle>
                            문제 등록 <TextStyle>자격증은 학년, 학기 기타 카테고리입니다.</TextStyle>
                        </TitleStyle>
                        <CreateEditor />
                        <br />
                    </>
                );
            case AdminMenuStatus.ADMIN_VIEW:
                return (
                    <>
                        <TitleStyle>문제 관리</TitleStyle>
                        <ProblemTable />
                    </>
                );
            case AdminMenuStatus.ADMIN_USERBLOCK:
                return (
                    <>
                        <TitleStyle>유저 차단 설정</TitleStyle>
                        <UserTable />
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
