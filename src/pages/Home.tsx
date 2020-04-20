import React from 'react';
import styled from 'styled-components';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cogoToast from 'cogo-toast';
import DefaultLayout from '../layouts/DefaultLayout';
import { useProfile } from '../hooks/useProfile';
import FontedMiddleText from '../atomics/Typography/FontedMiddleText';
import Container from '../utils/ContainerUtils/Container';
import Logout from '../components/Logout';
import MealCard from '../components/MealCard';
import Card from '../components/Card';
import NoStyleLink from '../atomics/NoStyleLink';
import CardTitle from '../atomics/Typography/CardTitle';
import BookIcon from '../atomics/icons/BookIcon';
import PodiumIcon from '../atomics/icons/PodiumIcon';
import TestIcon from '../atomics/icons/TestIcon';
import SettingsIcon from '../atomics/icons/SettingsIcon';

const BodyStyle = styled.div`
    display: flex;
    flex-flow: row wrap;

    @media screen and (max-width: 1000px) {
        justify-content: center;
    }
`;

const IconWrapperStyle = styled.div<{ pcMargin: string; mobileMargin: string }>`
    display: flex;
    flex-direction: row-reverse;
    opacity: 0.5;
    margin-top: ${(props) => props.pcMargin}rem;
    z-index: -10;

    @media screen and (max-width: 1000px) {
        margin-top: ${(props) => props.mobileMargin}rem;
    }
`;

const DisableTextStyle = styled.div`
    & > p {
        color: var(--color-gray-background);
    }
`;

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

const MiddleBodyStyle = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
    }
`;

const Home: React.FC = () => {
    const profile = useProfile();

    const name = profile.data ? profile!.data.name : '불러오는중';

    const onClickParkingCard = () => {
        cogoToast.info('해당 서비스는 준비중입니다.');
    };

    return (
        <DefaultLayout>
            <Container>
                <br />

                <HeaderTextStyle>
                    <LogoTextStyle>수프트</LogoTextStyle>
                    <MiddleBodyStyle>
                        <FontedMiddleText>환영합니다, {name} 님</FontedMiddleText>
                        <Logout styling>
                            <FontAwesomeIcon icon={faSignOutAlt} /> 로그아웃
                        </Logout>
                    </MiddleBodyStyle>
                </HeaderTextStyle>

                <BodyStyle>
                    <MealCard />

                    <Card
                      pcWidth="calc(50% - 3rem)"
                      pcHeight="10rem"
                      mobileWidth="18rem"
                      mobileHeight="8rem"
                      inline
                      isClick
                    >
                        <NoStyleLink to="/subject">
                            <CardTitle>문제풀이 시작하기</CardTitle>
                            <p>국어, 수학 같은 일반과목 또는 전공과목 문제를 풉니다.</p>
                            <IconWrapperStyle pcMargin="1" mobileMargin="-2.5">
                                <BookIcon size="6rem" />
                            </IconWrapperStyle>
                        </NoStyleLink>
                    </Card>

                    <Card
                      pcWidth="calc(50% - 3rem)"
                      pcHeight="10rem"
                      mobileWidth="18rem"
                      mobileHeight="8rem"
                      inline
                      isClick
                      onClick={onClickParkingCard}
                    >
                        <DisableTextStyle>
                            <CardTitle>기여도</CardTitle>
                            <p>문제 출제에 기여한 순위를 봅니다.</p>
                            <IconWrapperStyle pcMargin="0.8" mobileMargin="-1.2">
                                <PodiumIcon size="6rem" />
                            </IconWrapperStyle>
                        </DisableTextStyle>
                    </Card>

                    <Card
                      pcWidth="calc(50% - 3rem)"
                      pcHeight="10rem"
                      mobileWidth="18rem"
                      mobileHeight="8rem"
                      inline
                      isClick
                      onClick={onClickParkingCard}
                    >
                        <DisableTextStyle>
                            <CardTitle>내 문제</CardTitle>
                            <p>새로운 문제를 출제하거나 기존 문제를 관리합니다.</p>
                            <IconWrapperStyle pcMargin="0.8" mobileMargin="-2.7">
                                <TestIcon size="6rem" />
                            </IconWrapperStyle>
                        </DisableTextStyle>
                    </Card>

                    <Card
                      pcWidth="calc(50% - 3rem)"
                      pcHeight="10rem"
                      mobileWidth="18rem"
                      mobileHeight="8rem"
                      inline
                      isClick
                    >
                        <NoStyleLink to="/myinfo">
                            <CardTitle>내 정보</CardTitle>
                            <p>계정에 관련된 내용을 보거나 설정합니다.</p>
                            <IconWrapperStyle pcMargin="0.8" mobileMargin="-1.2">
                                <SettingsIcon size="6rem" />
                            </IconWrapperStyle>
                        </NoStyleLink>
                    </Card>
                </BodyStyle>
            </Container>
        </DefaultLayout>
    );
};

export default Home;
