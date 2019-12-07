import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import { useProfile } from '../hooks/useProfile';
import MainMenu from '../components/MainMenu';
import Login from '../components/Login';
import AuthLayout from '../layouts/AuthLayout';

const LogoTextStyle = styled.p`
    font-family: 'Gugi';
    font-size: 50px;
    text-align: left;
    margin-bottom: 30px;
`;

const BodyStyle = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
`;

const Main: React.FC = () => {
    const profile = useProfile();

    if (profile !== undefined && !profile.success) {
        return (
            <AuthLayout>
                <Login/>
            </AuthLayout>
        );
    }

    return (
        <MainLayout>
            <div>
                <LogoTextStyle>수프트</LogoTextStyle>

                <BodyStyle>
                    <MainMenu/>
                </BodyStyle>
            </div>
        </MainLayout>
    );
};

export default Main;
