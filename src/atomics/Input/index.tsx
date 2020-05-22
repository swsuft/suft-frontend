import React from 'react';
import styled from 'styled-components';

const InputStyle = styled.input<{ width?: string; height?: string }>`
    border: none;
    border-radius: 20px;
    width: ${(props) => props.width || '95%'};
    height: ${(props) => props.height || '46px'};
    padding-left: 20px;
    margin-bottom: 10px;
    background-color: white;

    &:disabled {
        background-color: #dddddd;
        cursor: no-drop;
    }
`;

interface InputProps {
    readonly value: string;
    readonly type?: string;
    readonly placeholder?: string;
    readonly width?: string;
    readonly height?: string;
    readonly disabled?: boolean;
    readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
    readonly onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ value, type, placeholder, width, height, disabled, onChange, onKeyPress }) => {
    return (
        <InputStyle
          value={value}
          type={type}
          placeholder={placeholder}
          width={width}
          height={height}
          onChange={onChange}
          onKeyPress={onKeyPress}
          disabled={disabled}
        />
    );
};

export default Input;
