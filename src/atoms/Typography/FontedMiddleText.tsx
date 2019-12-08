import React from 'react';
import styled from 'styled-components';

const TextStyle = styled.p`
    font-size: 20px;
    font-family: 'Godo', sans-serif;
`;

const FontedMiddleText: React.FC = ({ children }) => <TextStyle>{children}</TextStyle>;

export default FontedMiddleText;
