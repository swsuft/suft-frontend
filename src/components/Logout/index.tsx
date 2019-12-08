import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import config from '../../constants/config';

const LogoutTextStyle = styled.div`
    font-size: 16px;
    color: var(--color-text);
    text-decoration: none;
    transition: all 200ms ease;
    margin-left: 8px;

    &:hover {
        color: var(--color-yellow);
        cursor: pointer;
    }
`;

interface LogoutProps {
    readonly styling?: boolean;
}

const Logout: React.FC<LogoutProps> = ({ styling, children }) => {
    const onLogoutClick = () => {
        const check = window.confirm('진짜로 정말로 로그아웃 할까요?');

        if (check) {
            axios
                .post(
                    `${config.ENDPOINT}/logout`,
                    {},
                    { withCredentials: true }
                )
                .then((data) => {
                    if (!data.data.success) {
                        alert(data.data.message);
                    } else {
                        alert('로그아웃 완료');
                        localStorage.removeItem('token');
                        window.location.reload();
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        }
    };

    if (styling) {
        return (
            <LogoutTextStyle onClick={onLogoutClick}>
                {children}
            </LogoutTextStyle>
        );
    }

    return (
        <div onClick={onLogoutClick}>
            {children}
        </div>
    );
};

export default Logout;
