import React from 'react';
import styled from 'styled-components';
import Card from '../Card';
import CardTitle from '../../atomics/Typography/CardTitle';
import BookIcon from '../../atomics/icons/BookIcon';
import PodiumIcon from '../../atomics/icons/PodiumIcon';
import TestIcon from '../../atomics/icons/TestIcon';
import SettingsIcon from '../../atomics/icons/SettingsIcon';
import NoStyleLink from '../../atomics/NoStyleLink';

const Container = styled.div`
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

const CardList: React.FC = () => {
    return (
        <Container>
            <Card>
                <NoStyleLink to="/subject">
                    <CardTitle>문제풀이 시작하기</CardTitle>
                    <p>국어, 수학 같은 일반과목 또는 전공과목 문제를 풉니다.</p>
                    <IconWrapperStyle pcMargin="1" mobileMargin="-2.5">
                        <BookIcon size="6rem" />
                    </IconWrapperStyle>
                </NoStyleLink>
            </Card>

            <Card>
                <CardTitle>기여도</CardTitle>
                <p>문제 출제에 기여한 순위를 봅니다.</p>
                <IconWrapperStyle pcMargin="0.8" mobileMargin="-1.2">
                    <PodiumIcon size="6rem" />
                </IconWrapperStyle>
            </Card>

            <Card>
                <CardTitle>내 문제</CardTitle>
                <p>새로운 문제를 출제하거나 기존 문제를 관리합니다.</p>
                <IconWrapperStyle pcMargin="0.8" mobileMargin="-2.7">
                    <TestIcon size="6rem" />
                </IconWrapperStyle>
            </Card>

            <Card>
                <CardTitle>내 정보</CardTitle>
                <p>계정에 관련된 내용을 보거나 설정합니다.</p>
                <IconWrapperStyle pcMargin="0.8" mobileMargin="-1.2">
                    <SettingsIcon size="6rem" />
                </IconWrapperStyle>
            </Card>
        </Container>
    );
};

export default CardList;
