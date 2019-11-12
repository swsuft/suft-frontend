import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

const LoginButtonStyle = styled.button`
    width: 60%;
    height: 46px;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    border: none;
    border-radius: 10px;
    background-color: var(--color-yellow);
    cursor: pointer;
`;

interface LoginButtonProps {
    readonly onClick?: any;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => (
    <LoginButtonStyle onClick={onClick}>
        <FontAwesomeIcon icon={faDoorOpen}/> 로그인
    </LoginButtonStyle>
);

export default LoginButton;
