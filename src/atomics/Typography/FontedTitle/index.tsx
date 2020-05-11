import React from 'react';
import styled from 'styled-components';

const TitleStyle = styled.p`
    font-family: 'Godo', sans-serif;
    font-size: 1.8rem;
    margin: 2rem 0;
`;

const FontedTitle: React.FC = ({ children }) => <TitleStyle>{children}</TitleStyle>;

export default FontedTitle;
