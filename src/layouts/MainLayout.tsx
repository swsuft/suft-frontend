import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Background from '../utils/Background';

const WrapperStyle = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
`;

const BodyStyle = styled.div`
    flex: 1;
`;

const MainLayout: React.FC = ({ children }) => {
    return (
        <WrapperStyle>
            <BodyStyle>{children}</BodyStyle>

            <Footer />
            <Background color="#f1f2f6" />
        </WrapperStyle>
    );
};

export default MainLayout;
