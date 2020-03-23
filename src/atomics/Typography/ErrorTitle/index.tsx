import React from 'react';
import styled from 'styled-components';

const ErrorTitleStyle = styled.span`
    font-size: 2em;
    font-weight: bold;
    color: white;
    background-color: var(--color-red);
    padding: 0 4px;
`;

const ErrorTitle: React.FC = ({ children }) => <ErrorTitleStyle>{children}</ErrorTitleStyle>;

export default ErrorTitle;
