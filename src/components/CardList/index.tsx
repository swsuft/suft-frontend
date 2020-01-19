import React from 'react';
import styled from 'styled-components';
import Card from '../Card';
import CardTitle from '../../atomics/Typography/CardTitle';
import OpenBook from '../../atomics/icons/Book';
import Podium from '../../atomics/icons/Podium';

const Container = styled.div`
    display: flex;
    flex-flow: row wrap;

    @media screen and (max-width: 1000px) {
        justify-content: center;
    }
`;

const BookIconWrapperStyle = styled.div`
    display: flex;
    flex-direction: row-reverse;
    opacity: 0.5;
    margin-top: 1rem;

    @media screen and (max-width: 1000px) {
        margin-top: -2.5rem;
    }
`;

const PodiumIconWrapperStyle = styled.div`
    display: flex;
    flex-direction: row-reverse;
    opacity: 0.5;
    margin-top: 0.8rem;

    @media screen and (max-width: 1000px) {
        margin-top: -1.2rem;
    }
`;

const CardList: React.FC = () => {
    return (
        <Container>
            <Card>
                <CardTitle>문제풀이 시작하기</CardTitle>
                <p>국어, 수학 같은 일반과목 또는 전공과목 문제를 풉니다.</p>
                <BookIconWrapperStyle>
                    <OpenBook size="6rem" />
                </BookIconWrapperStyle>
            </Card>

            <Card>
                <CardTitle>기여도</CardTitle>
                <p>문제 출제에 기여한 순위를 봅니다.</p>
                <PodiumIconWrapperStyle>
                    <Podium size="6rem" />
                </PodiumIconWrapperStyle>
            </Card>

            <Card>
                <CardTitle>제목</CardTitle>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim tincidunt tristique.</p>

            </Card>

            <Card>
                <CardTitle>제목</CardTitle>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim tincidunt tristique.</p>
            </Card>
        </Container>
    );
};

export default CardList;
