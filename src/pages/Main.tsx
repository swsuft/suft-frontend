import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import { useProfile } from '../hooks/useProfile';
import MainMenu from '../components/MainMenu';
import Login from '../components/Login';
import AuthLayout from '../layouts/AuthLayout';
import useWidth from '../hooks/useWidth';
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

const Main: React.FC = () => {
    const profile = useProfile();
    const width = useWidth();

    if (profile !== undefined && !profile.success) {
        return (
            <AuthLayout>
                <Login/>
            </AuthLayout>
        );
    }

    if (width <= 900) {
        return (
            <MainLayout>
                <div>
                    <LogoTextStyle>수프트</LogoTextStyle>

                    <MobileMainMenu/>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div>
                <LogoTextStyle>수프트</LogoTextStyle>

                <MainMenu/>
            </div>
        </MainLayout>
    );
};

export default Main;
