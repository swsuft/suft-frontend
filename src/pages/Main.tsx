import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import { useProfile } from '../hooks/useProfile';
import MainMenu from '../components/MainMenu';
import Login from '../components/Login';
import MobileMainMenu from '../components/MainMenu/Mobile';
import FontedMiddleText from '../atoms/Typography/FontedMiddleText';

const LogoTextStyle = styled.p`
    font-family: 'Gugi';
    font-size: 50px;
    text-align: left;
    
    @media screen and (max-width: 900px) {
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

const HeaderTextStyle = styled.div`
    margin-bottom: 30px;
    
    @media screen and (max-width: 900px) {
        margin-top: 30px;
        text-align: center;
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

    const name = profile ? profile.name : '불러오는중';

    return (
        <MainLayout>
            <PCWrapperStyle>
                <HeaderTextStyle>
                    <LogoTextStyle>수프트</LogoTextStyle>
                    <FontedMiddleText>환영합니다, {name} 님</FontedMiddleText>
                </HeaderTextStyle>
                <MainMenu/>
            </PCWrapperStyle>

            <MobileWrapperStyle>
                <HeaderTextStyle>
                    <LogoTextStyle>수프트</LogoTextStyle>
                    <FontedMiddleText>환영합니다, {name} 님</FontedMiddleText>
                </HeaderTextStyle>
                <MobileMainMenu/>
            </MobileWrapperStyle>
        </MainLayout>
    );
};

export default Main;
