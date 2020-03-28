import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import AdminSideBar from '../components/Admin/SideBar';
import { AdminMenuStatusType } from '../constants/AdminMenuStatus';

const AdminContainer = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    width: 100%;
`;

const AdminBodyStyle = styled.div`
    display: flex;

    @media screen and (max-width: 420px) {
        display: block;
    }
`;

const AdminContentStyle = styled.div`
    flex: 1;
`;

interface AdminLayoutProps {
    readonly setNowMenu: React.Dispatch<React.SetStateAction<AdminMenuStatusType>>;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, setNowMenu }) => {
    return (
        <AdminContainer>
            <AdminBodyStyle>
                <AdminSideBar setNowMenu={setNowMenu} />
                <AdminContentStyle>{children}</AdminContentStyle>
            </AdminBodyStyle>

            <Footer />
        </AdminContainer>
    );
};

export default AdminLayout;
