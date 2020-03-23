import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import NotFoundError from '../components/Error/NotFoundError';

const Container = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    width: 100%;
`;

const NotFound: React.FC = () => {
    // Legacy-NotFoundError Page
    return (
        <Container>
            <NotFoundError />
            <Footer />
        </Container>
    );
};

export default NotFound;
