import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import useAdmin from '../hooks/useAdmin';
import NoPermissionError from '../components/Error/NoPermissionError';

const AdminStyle = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
`;

const AdminContentsStyle = styled.div`
    flex: 1;
`;

const AdminEditLayout: React.FC = ({ children }) => {
    const isAdmin = useAdmin();

    if (isAdmin) {
        return (
            <AdminStyle>
                <AdminContentsStyle>{children}</AdminContentsStyle>

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

export default AdminEditLayout;
