import React from 'react';
import styled from 'styled-components';
import Container from '../utils/ContainerUtils/Container';
import DefaultLayout from './DefaultLayout';
import SideMenu from '../components/SideMenu';

const AdminContainer = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 420px) {
        flex-direction: column;
    }
`;

const BodyStyle = styled.div`
    width: 100%;
`;

const items = [
    {
        to: '/admin/view',
        name: '문제 관리'
    },
    {
        to: '/admin/user',
        name: '유저 관리'
    },
    {
        to: '/admin/waitinguser',
        name: '가입 요청'
    },
    {
        to: '/admin/denyuser',
        name: '거절 목록'
    }
];

const AdminLayout: React.FC = ({ children }) => {
    return (
        <DefaultLayout>
            <Container>
                <AdminContainer>
                    <SideMenu menuTitle="ADMIN" items={items} current={window.location.pathname} />
                    <BodyStyle>{children}</BodyStyle>
                </AdminContainer>
            </Container>
        </DefaultLayout>
    );
};

export default AdminLayout;
