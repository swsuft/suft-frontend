import styled from 'styled-components';

const SmallButton = styled.button<{ background: string, color?: string }>`
    border: none;
    border-radius: 10px;
    width: 150px;
    height: 35px;
    color: ${(props) => props.color || '#ffffff'};
    background-color: ${(props) => props.background};
    cursor: pointer;
`;

export default SmallButton;
