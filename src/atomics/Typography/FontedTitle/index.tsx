import React from 'react';
import styled from 'styled-components';

const TitleStyle = styled.p`
    font-family: 'Godo', sans-serif;
    font-size: 36px;
    margin: 2rem 0;
`;

const FontedTitle: React.FC = ({ children }) => <TitleStyle>{children}</TitleStyle>;

export default FontedTitle;
