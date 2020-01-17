import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LinkStyle = styled(Link)`
    color: inherit;
    text-decoration: none;
`;

interface NoStyleLinkProps {
    readonly to: string;
    readonly onClick?: any;
}

const NoStyleLink: React.FC<NoStyleLinkProps> = ({ to, onClick, children }) => {
    return (
        <LinkStyle to={to} onClick={onClick}>
            {children}
        </LinkStyle>
    );
};

export default NoStyleLink;
