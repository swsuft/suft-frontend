import React from 'react';
import styled from 'styled-components';

const HyperLinkStyle = styled.a`
    color: inherit;
    text-decoration: none;
`;

interface NoStyleAProps {
    readonly href: string;
    readonly target?: string;
    readonly rel?: string;
}

const NoStyleA: React.FC<NoStyleAProps> = ({ href, target, rel, children }) => {
    return (
        <HyperLinkStyle href={href} target={target} rel={rel}>
            {children}
        </HyperLinkStyle>
    );
};

export default NoStyleA;
