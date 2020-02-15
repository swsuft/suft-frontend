import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import useAdmin from '../hooks/useAdmin';
import NoPermissionError from '../components/Error/NoPermissionError';

const AdminContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
`;

const AdminContentStyle = styled.div`
    flex: 1;
`;

const AdminEditLayout: React.FC = ({ children }) => {
    const isAdmin = useAdmin();

    if (isAdmin) {
        return (
            <AdminContainerStyle>
                <AdminContentStyle>{children}</AdminContentStyle>
                <Footer />
            </AdminContainerStyle>
        );
    }

    return (
        <AdminContainerStyle>
            <NoPermissionError />
            <Footer />
        </AdminContainerStyle>
    );
};

export default AdminEditLayout;
