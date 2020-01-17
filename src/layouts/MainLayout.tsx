import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Container from '../utils/ContainerUtils/Container';

const WrapperStyle = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
`;

const BodyStyle = styled.div`
    flex: 1;
    margin-top: 2rem;
`;

const MainLayout: React.FC = ({ children }) => {
    return (
        <WrapperStyle>
            <BodyStyle>
                <Container>{children}</Container>
            </BodyStyle>

            <Footer />
        </WrapperStyle>
    );
};

export default MainLayout;
