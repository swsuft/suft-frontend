import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ExternalComponentLink from '../../atomics/Login/ExternalComponentLink';

const EtcTextStyle = styled.p`
    font-size: 16px;
    color: var(--color-text);

    @media screen and (max-width: 420px) {
        display: none;
    }
`;

const BackPageTextStyle = styled(Link)`
    font-size: 16px;
    color: var(--color-text);
    text-decoration: none;
    transition: all 200ms ease;

    &:hover {
        color: var(--color-yellow);
        cursor: pointer;
    }
`;

const MobileTextStyle = styled.p`
    display: none;
    font-size: 16px;
    color: var(--color-text);

    @media screen and (max-width: 420px) {
        display: block;
    }
`;

const RegisterFooterText: React.FC = () => {
    return (
        <>
            <EtcTextStyle>
                로그인 및 회원가입 시 수프트{' '}
                <ExternalComponentLink to="/privacy">개인정보처리방침</ExternalComponentLink>에 동의하는 것으로
                간주합니다.
            </EtcTextStyle>
            <MobileTextStyle>
                회원가입 시 <ExternalComponentLink to="/privacy">개인정보처리방침</ExternalComponentLink>에 동의합니다.
            </MobileTextStyle>
            <p>
                <BackPageTextStyle to="/">
                    <FontAwesomeIcon icon={faArrowRight} /> 로그인 창으로 돌아가기
                </BackPageTextStyle>
            </p>
        </>
    );
};

export default RegisterFooterText;
