import React from 'react';
import styled from 'styled-components';

const TextStyle = styled.p`
    font-size: 26px;
    font-family: 'Godo', sans-serif;
    margin-bottom: 0.5rem;
`;

const CardTitle: React.FC = ({ children }) => <TextStyle>{children}</TextStyle>;

export default CardTitle;