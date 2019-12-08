import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div<{ isButton?: boolean }>`
    display: flex;
    background-color: white;
    border-radius: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    box-shadow: 5px 5px 5px #cbcbcb;
    text-align: center;
    ${(props) => (props.isButton ? 'cursor: pointer' : '')};
`;

const CardBodyStyle = styled.div`
    position: relative;
    flex: 1;
    align-self: center;
    color: black;
`;

interface CardProps {
    readonly width?: string;
    readonly height?: string;
    readonly isButton?: boolean;
}

const Card: React.FC<CardProps> = ({ width, height, isButton, children }) => {
    return (

        <CardStyle style={{ width, height }} isButton={isButton}>
            <CardBodyStyle>
                {children}
            </CardBodyStyle>
        </CardStyle>
    );
};

export default Card;
