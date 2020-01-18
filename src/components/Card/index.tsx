import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div`
    width: 400px;
    height: 160px;
    background-color: white;
`;

const Card: React.FC = () => {
    return (
        <CardStyle>
            <h2>일반과목 문제 풀기</h2>
            <p>어쩌구 설명 그런데 그래서 그렇게</p>
        </CardStyle>
    );
};

export default Card;
