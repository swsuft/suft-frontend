import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import AdminSideBar from '../components/Admin/SideBar';
import { AdminMenuStatusType } from '../constants/AdminMenuStatus';
import useAdmin from '../hooks/useAdmin';
import NoPermissionError from '../components/Error/NoPermissionError';

const AdminStyle = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    width: 100%;
`;

const AdminWrapStyle = styled.div`
    display: flex;

    @media screen and (max-width: 420px) {
        display: block;
    }
`;

const AdminContentsStyle = styled.div`
    flex: 1;
`;

interface AdminLayoutProps {
    readonly setNowMenu: React.Dispatch<React.SetStateAction<AdminMenuStatusType>>;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, setNowMenu }) => {
    const isAdmin = useAdmin();

    if (isAdmin) {
        return (
            <AdminStyle>
                <AdminWrapStyle>
                    <AdminSideBar setNowMenu={setNowMenu} />

                    <AdminContentsStyle>{children}</AdminContentsStyle>
                </AdminWrapStyle>

                <Footer />
            </AdminStyle>
        );
    }

    return (
        <AdminStyle>
            <NoPermissionError />

            <Footer />
        </AdminStyle>
    );
};

export default AdminLayout;
