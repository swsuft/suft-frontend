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
`;

const HeaderTextStyle = styled.div`
    margin-bottom: 30px;
    
    @media screen and (max-width: 1000px) {
        text-align: center;
    }
`;

const WrapperStyle = styled.div`
    margin-top: 2rem;

    @media screen and (max-width: 1000px) {
        display: flex;
        justify-content: center;
    }
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
                    <div>
                        <HeaderTextStyle>
                            <LogoTextStyle>수프트</LogoTextStyle>
                            <FontedMiddleText>환영합니다, {name} 님</FontedMiddleText>
                        </HeaderTextStyle>

                        <Card>
                            <h2>제목</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim tincidunt tristique.</p>
                        </Card>
                    </div>
                </WrapperStyle>
            </Container>
        </MainLayout>
    );
};

export default Home;
