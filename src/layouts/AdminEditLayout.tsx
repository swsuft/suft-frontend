import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';

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
    return (
        <AdminContainerStyle>
            <AdminContentStyle>{children}</AdminContentStyle>
            <Footer />
        </AdminContainerStyle>
    );
};

export default AdminEditLayout;
