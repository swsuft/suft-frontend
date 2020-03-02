import React from 'react';
import styled from 'styled-components';

const SelectStyle = styled.select<{ width?: string; height?: string }>`
    border: none;
    border-radius: 20px;
    width: ${(props) => props.width || '340px'};
    height: ${(props) => props.height || '46px'};
    padding-left: 20px;
    appearance: none;
    margin-bottom: 10px;
    background-color: white;
`;

interface SelectProps {
    readonly value: string;
    readonly width?: string;
    readonly height?: string;
    readonly onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const Select: React.FC<SelectProps> = ({ value, width, height, onChange, children }) => {
    return (
        <SelectStyle value={value} width={width} height={height} onChange={onChange}>
            {children}
        </SelectStyle>
    );
};

export default Select;
