import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div<{ isButton?: boolean, isMobile?: boolean, isLast?: boolean }>`
    display: flex;
    background-color: white;
    border-radius: 10px;
    margin-right: ${(props) => (props.isLast ? '0;' : '20px;')};
    margin-bottom: 20px;
    box-shadow: 5px 5px 5px #cbcbcb;
    text-align: center;
    ${(props) => (props.isButton ? 'cursor: pointer;' : '')};
    
    @media screen and (max-width: 900px) {
        ${(props) => (props.isMobile ? 'margin-right: 0;' : '')};       
    }
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
    readonly isMobile?: boolean;
    readonly isLast?: boolean;
}

const Card: React.FC<CardProps> = ({ width, height, isButton, isMobile, isLast, children }) => {
    return (

        <CardStyle style={{ width, height }} isButton={isButton} isMobile={isMobile} isLast={isLast}>
            <CardBodyStyle>
                {children}
            </CardBodyStyle>
        </CardStyle>
    );
};

export default Card;
