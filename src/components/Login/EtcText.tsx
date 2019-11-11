import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const EtcTextStyle = styled.p`
    font-size: 16px;
    color: var(--color-text);
`;

const LineBreakStyle = styled.br`
    display: none;
    
    @media screen and (max-width: 420px) {
        display: inline;
    }    
`;

const RegisterTextStyle = styled(Link)`
    color: var(--color-text);
    text-decoration: underline;
    transition: all 200ms ease;

    &:hover {
        color: var(--color-yellow);
        cursor: pointer;
    }
`;

const EtcText: React.FC = () => (
    <EtcTextStyle>
        로그인을 하여 모든 서비스를 이용하거나 <LineBreakStyle/>
        <RegisterTextStyle to="/register">회원가입 하기</RegisterTextStyle>
    </EtcTextStyle>
);

export default EtcText;
