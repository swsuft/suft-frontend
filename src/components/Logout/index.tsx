import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import TokenUtil from '../../api/TokenUtil';
import { getGraphQLError } from '../../api/errorHandler';

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

const LOGOUT = gql`
    mutation {
        logout
    }
`;

const Logout: React.FC<RouteComponentProps & LogoutProps> = ({ history, styling, children }) => {
    const [logout] = useMutation(LOGOUT);

    const onLogoutClick = () => {
        const check = window.confirm('진짜로 정말로 로그아웃 할까요?');

        if (check) {
            logout()
                .then(() => {
                    TokenUtil.remove();
                    history.push('/');
                    window.location.reload();
                })
                .catch((err) => {
                    const gerror = getGraphQLError(err);
                    if (!gerror) return;
                    cogoToast.error(gerror[1]);
                });
        }
    };

    if (styling) {
        return <LogoutTextStyle onClick={onLogoutClick}>{children}</LogoutTextStyle>;
    }

    return <LogoutButtonStyle onClick={onLogoutClick}>{children}</LogoutButtonStyle>;
};

export default withRouter(Logout);
