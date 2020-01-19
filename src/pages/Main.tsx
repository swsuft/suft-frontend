import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import { useProfile } from '../hooks/useProfile';
import Login from '../components/Login';
import FontedMiddleText from '../atomics/Typography/FontedMiddleText';
import Card from '../components/Card';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';
import Container from '../utils/ContainerUtils/Container';

const LogoTextStyle = styled.p`
    font-family: 'Gugi';
    font-size: 50px;
    text-align: left;

    @media screen and (max-width: 900px) {
        text-align: center;
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
                <CenterContainer>
                    <Login />
                </CenterContainer>
            </MainLayout>
        );
    }

    const name = profile ? profile.name : '불러오는중';

    return (
        <MainLayout>
            <Container>
                <HeaderTextStyle>
                    <LogoTextStyle>수프트</LogoTextStyle>
                    <FontedMiddleText>환영합니다, {name} 님</FontedMiddleText>
                </HeaderTextStyle>

                <Card />
            </Container>
        </MainLayout>
    );
};

export default Main;
