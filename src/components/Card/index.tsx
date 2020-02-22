import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div<CardProps>`
    width: ${(props) => props.pcWidth};
    height: ${(props) => props.pcHeight};
    background-color: white;
    padding: 1rem;
    margin-right: ${(props) => (props.inline ? '1rem' : '0')};
    margin-bottom: 1rem;

    transition: all 0.1s ease-in-out;

    &:hover {
        box-shadow: 5px 5px 1px var(--color-yellow);
        ${(props) => (props.isClick ? 'cursor: pointer' : '')};
    }

    @media screen and (max-width: 1000px) {
        width: ${(props) => props.mobileWidth};
        height: ${(props) => props.mobileHeight};
        margin-right: 0;
    }
`;

interface CardProps {
    readonly pcWidth: string;
    readonly pcHeight: string;
    readonly mobileWidth: string;
    readonly mobileHeight: string;
    readonly inline?: boolean;
    readonly isClick?: boolean;
    readonly onClick?: React.MouseEventHandler;
}

const Card: React.FC<CardProps> = ({ pcWidth, pcHeight, mobileWidth, mobileHeight, inline, isClick, onClick, children }) => {
    return (
        <CardStyle pcWidth={pcWidth} pcHeight={pcHeight} mobileWidth={mobileWidth} mobileHeight={mobileHeight} inline={inline} isClick={isClick} onClick={onClick}>
            {children}
        </CardStyle>
    );
};

export default Card;
