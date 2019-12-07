import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import SnowStorm from 'react-snowstorm';
import Footer from '../components/Footer';
import Background from '../utils/Background';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';

const WrapperStyle = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
`;

const MainLayout: React.FC = ({ children }) => {
    return (
        <WrapperStyle>
            <CenterContainer>
                {children}
            </CenterContainer>

            <SnowStorm floflakesMax={80} flakesMaxActive={30} snowColor="#2c4365" vMaxX={0}/>
            <SnowStorm flakesMax={80} flakesMaxActive={30} snowColor="#676583" vMaxX={0}/>
            <SnowStorm flakesMax={80} flakesMaxActive={30} snowColor="#8a95b0" vMaxX={0}/>
            <Footer/>
            <Background color="#f1f2f6"/>
        </WrapperStyle>
    );
};

export default MainLayout;
