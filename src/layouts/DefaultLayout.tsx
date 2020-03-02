import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';

const WrapperStyle = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
`;

const BodyStyle = styled.div`
    flex: 1;
`;

const DefaultLayout: React.FC = ({ children }) => {
    return (
        <WrapperStyle>
            <BodyStyle>{children}</BodyStyle>

            <Footer />
        </WrapperStyle>
    );
};

export default DefaultLayout;
