import React from 'react';
import styled from 'styled-components';

const DayTagStyle = styled.span`
    color: white;
    background-color: var(--color-red);
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 12px;
    border-radius: 10px;
    padding: 2px 6px;
`;

const DayTag: React.FC = ({ children }) => {
    return <DayTagStyle>{children}</DayTagStyle>;
};

export default DayTag;
