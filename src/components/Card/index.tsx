import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div`
    width: 26rem;
    height: 10rem;
    background-color: white;
    padding: 1rem;

    &:hover {
        box-shadow: 5px 5px 1px var(--color-yellow);
        cursor: pointer;
    }
`;

const Card: React.FC = ({ children }) => {
    return <CardStyle>{children}</CardStyle>;
};

export default Card;
