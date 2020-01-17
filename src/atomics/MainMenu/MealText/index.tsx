import React from 'react';
import styled from 'styled-components';

const TextStyle = styled.pre`
    font-size: 16px;
    font-family: 'Noto Sans KR', sans-serif;
`;

const MealText: React.FC = ({ children }) => <TextStyle>{children}</TextStyle>;

export default MealText;
