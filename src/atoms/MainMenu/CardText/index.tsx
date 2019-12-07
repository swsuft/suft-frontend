import React from 'react';
import styled from 'styled-components';

const TextStyle = styled.p`
    font-family: 'Godo';
    margin-top: 6px;
`;

const CardText: React.FC = ({ children }) => <TextStyle>{children}</TextStyle>;

export default CardText;
