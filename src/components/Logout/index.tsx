import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import config from '../../config';

const LogoutTextStyle = styled.button`
    font-size: 16px;
    border: none;
    background: initial;
    color: var(--color-text);
    text-decoration: none;
    transition: all 200ms ease;
    margin-left: 8px;

    &:hover {
        color: var(--color-yellow);
        cursor: pointer;
    }
`;

const LogoutButtonStyle = styled.button`
    border: none;
    background: initial;
`;

interface LogoutProps {
    readonly styling?: boolean;
}

const Logout: React.FC<RouteComponentProps & LogoutProps> = ({ history, styling, children }) => {
    const onLogoutClick = () => {
        const check = window.confirm('진짜로 정말로 로그아웃 할까요?');

        if (check) {
            axios
                .post(`${config.ENDPOINT}/logout`, {}, { withCredentials: true })
                .then((data) => {
                    if (!data.data.success) {
                        alert(data.data.message);
                    } else {
                        localStorage.removeItem('token');
                        history.push('/');
                        window.location.reload();
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        }
    };

    if (styling) {
        return <LogoutTextStyle onClick={onLogoutClick}>{children}</LogoutTextStyle>;
    }

    return <LogoutButtonStyle onClick={onLogoutClick}>{children}</LogoutButtonStyle>;
};

export default withRouter(Logout);
