import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Background from '../utils/Background';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';

const MainWrapStyle = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
`;

const MainLayout: React.FC = ({ children }) => {
    return (
        <MainWrapStyle>
            <CenterContainer>
                {children}
            </CenterContainer>

            <Footer/>
            <Background color="#f1f2f6"/>
        </MainWrapStyle>
    );
};

export default MainLayout;
