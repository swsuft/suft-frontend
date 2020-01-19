import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import { useProfile } from '../hooks/useProfile';
import Login from '../components/Login';
import FontedMiddleText from '../atomics/Typography/FontedMiddleText';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';
import Container from '../utils/ContainerUtils/Container';
import CardList from '../components/CardList';

const LogoTextStyle = styled.p`
    font-family: 'Gugi';
    font-size: 50px;
`;

const HeaderTextStyle = styled.div`
    margin-bottom: 30px;

    @media screen and (max-width: 1000px) {
        text-align: center;
    }
`;

const WrapperStyle = styled.div`
    margin-top: 2rem;
`;

const Home: React.FC = () => {
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
                <WrapperStyle>
                    <HeaderTextStyle>
                        <LogoTextStyle>수프트</LogoTextStyle>
                        <FontedMiddleText>환영합니다, {name} 님</FontedMiddleText>
                    </HeaderTextStyle>

                    <CardList />
                </WrapperStyle>
            </Container>
        </MainLayout>
    );
};

export default Home;
