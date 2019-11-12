import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TextStyle = styled(Link)`
    color: var(--color-text);
    text-decoration: underline;
    transition: all 200ms ease;

    &:hover {
        color: var(--color-yellow);
        cursor: pointer;
    }
`;

interface ExternalComponentLinkProps {
    readonly to: string;
}

const ExternalComponentLink: React.FC<ExternalComponentLinkProps> = ({ to, children }) => (
    <TextStyle to={to}>{ children }</TextStyle>
);

export default ExternalComponentLink;
