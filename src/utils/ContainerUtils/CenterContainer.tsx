import React from 'react';
import styled from 'styled-components';

const FlexContainerStyle = styled.div`
    display: flex;
    min-height: calc(100vh - 100px);
    justify-content: center;
    align-items: center;
`;

const CenterContainer: React.FC = ({ children }) => <FlexContainerStyle>{children}</FlexContainerStyle>;

export default CenterContainer;
