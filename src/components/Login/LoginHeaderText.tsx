import React from 'react';
import styled from 'styled-components';

const SubTextStyle = styled.p`
    font-size: 32px;
    font-weight: bold;
    white-space: nowrap;

    @media screen and (max-width: 420px) {
        display: none;
    }
`;

const MainTextStyle = styled.p`
    font-family: 'Gugi';
    font-size: 46px;

    @media screen and (max-width: 420px) {
        text-align: center;
    }
`;

const LoginHeaderText: React.FC = () => (
    <>
        <SubTextStyle>시험 대비 문제풀이 서비스</SubTextStyle>
        <MainTextStyle>수프트</MainTextStyle>
    </>
);

export default LoginHeaderText;
