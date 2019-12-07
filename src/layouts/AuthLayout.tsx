import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Background from '../utils/Background';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';

const WrapperStyle = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
`;

const AuthLayout: React.FC = ({ children }) => {
    return (
        <WrapperStyle>
            <CenterContainer>
                {children}
            </CenterContainer>

            <Footer/>
            <Background color="#f1f2f6"/>
        </WrapperStyle>
    );
};

export default AuthLayout;
