import React from 'react';
import styled from 'styled-components';
import ExternalComponentLink from '../../atoms/Login/ExternalComponentLink';
import MobileLineBreak from '../../utils/MobileLineBreak';

const EtcTextStyle = styled.p`
    font-size: 16px;
    color: var(--color-text);
`;

const LoginFooterText: React.FC = () => (
    <EtcTextStyle>
        로그인을 하여 모든 서비스를 이용하거나 <MobileLineBreak/>
        <ExternalComponentLink to="/register">회원가입 하기</ExternalComponentLink>
    </EtcTextStyle>
);

export default LoginFooterText;
