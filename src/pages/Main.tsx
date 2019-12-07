import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import { useProfile } from '../hooks/useProfile';
import Container from '../utils/ContainerUtils/Container';
import MainMenu from '../components/MainMenu';
import Login from '../components/Login';
import AuthLayout from '../layouts/AuthLayout';

const LogoTextStyle = styled.p`
    font-family: 'Gugi';
    font-size: 48px;
    text-align: center;
    margin: 50px 0;
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
            <Container>
                <LogoTextStyle>수프트</LogoTextStyle>

                <BodyStyle>
                    <MainMenu/>
                </BodyStyle>
            </Container>
        </MainLayout>
    );
};

export default Main;
