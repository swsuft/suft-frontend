import React from 'react';
import styled from 'styled-components';
import Card from '../Card';
import CardTitle from '../../atomics/Typography/CardTitle';

const Container = styled.div`
    display: flex;
    flex-flow: row wrap;

    @media screen and (max-width: 1000px) {
        justify-content: center;
    }
`;

const CardList: React.FC = () => {
    return (
        <Container>
            <Card>
                <CardTitle>문제풀이 시작하기</CardTitle>
                <p>국어, 수학 같은 일반과목 또는 전공과목 문제를 풉니다.</p>
            </Card>

            <Card>
                <CardTitle>기여도</CardTitle>
                <p>문제 출제에 기여한 순위를 봅니다.</p>
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
