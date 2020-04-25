import React from 'react';
import styled from 'styled-components';

const MainTextStyle = styled.p`
    font-family: 'Gugi';
    font-size: 46px;

    @media screen and (max-width: 420px) {
        text-align: center;
    }
`;

const SubTextStyle = styled.p`
    font-size: 28px;
    font-weight: bold;
    white-space: nowrap;

    @media screen and (max-width: 420px) {
        display: none;
    }
`;

const RegisterHeaderText: React.FC = () => (
    <>
        <MainTextStyle>수프트</MainTextStyle>
        <SubTextStyle>회원가입</SubTextStyle>
    </>
);

export default RegisterHeaderText;
