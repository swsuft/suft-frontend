import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import { useProfile } from '../hooks/useProfile';
import MainMenu from '../components/MainMenu';
import Login from '../components/Login';
import MobileMainMenu from '../components/MainMenu/Mobile';

const LogoTextStyle = styled.p`
    font-family: 'Gugi';
    font-size: 50px;
    text-align: left;
    margin-bottom: 30px;
    
    @media screen and (max-width: 900px) {
        margin-top: 30px;
        text-align: center;
    }
`;

const PCWrapperStyle = styled.div`
    margin-left: 120px;

    @media screen and (max-width: 900px) {
        display: none;
    }    
`;

const MobileWrapperStyle = styled.div`
    display: none;
    
    @media screen and (max-width: 900px) {
        display: block;
    }
`;

const Main: React.FC = () => {
    const profile = useProfile();

    if (profile !== undefined && !profile.success) {
        return (
            <MainLayout>
                <Login/>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <PCWrapperStyle>
                <LogoTextStyle>수프트</LogoTextStyle>
                <MainMenu/>
            </PCWrapperStyle>

            <MobileWrapperStyle>
                <LogoTextStyle>수프트</LogoTextStyle>
                <MobileMainMenu/>
            </MobileWrapperStyle>
        </MainLayout>
    );
};

export default Main;
