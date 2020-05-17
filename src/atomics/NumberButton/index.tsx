import styled from 'styled-components';

const NumberButton = styled.button`
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

export default NumberButton;
