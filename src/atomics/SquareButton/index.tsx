import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
    width: 60%;
    height: 46px;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    border: none;
    border-radius: 10px;
    background-color: var(--color-yellow);
    cursor: pointer;
`;

interface SquareButtonProps {
    readonly onClick?: React.MouseEventHandler;
}

const SquareButton: React.FC<SquareButtonProps> = ({ onClick, children }) => <ButtonStyle onClick={onClick}>{children}</ButtonStyle>;

export default SquareButton;
