import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div`
    width: calc(50% - 3rem);
    height: 10rem;
    background-color: white;
    padding: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    
    transition: all 0.1s ease-in-out;
    
    &:hover {
        box-shadow: 5px 5px 1px var(--color-yellow);
        cursor: pointer;
    }
    
    @media screen and (max-width: 1000px) {
        width: 18rem;
        height: 8rem;
        margin-right: 0;
    }
`;

interface CardProps {
    readonly onClick?: React.MouseEventHandler;
}

const Card: React.FC<CardProps> = ({ onClick, children }) => {
    return <CardStyle onClick={onClick}>{children}</CardStyle>;
};

export default Card;
