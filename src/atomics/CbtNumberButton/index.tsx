import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
    vertical-align: middle;
    border: none;
    border-radius: 10px;
    width: 36px;
    height: 36px;
    color: #000;
    background-color: var(--color-yellow);
    cursor: pointer;
    margin-right: 10px;

    &:hover {
        color: white;
    }
`;

interface CbtNumberButtonProps {
    readonly onClick?: React.MouseEventHandler;
}

const CbtNumberButton: React.FC<CbtNumberButtonProps> = ({ onClick, children }) => {
    return <ButtonStyle onClick={onClick}>{children}</ButtonStyle>;
};

export default CbtNumberButton;
