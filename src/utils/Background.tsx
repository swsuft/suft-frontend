import React from 'react';
import styled from 'styled-components';

const BackgroundStyle = styled.div<{ color: string }>`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: ${(props) => props.color};
`;

interface BackgroundProps {
    readonly color: string;
}

const Background: React.FC<BackgroundProps> = ({ color }) => <BackgroundStyle color={color} />;

export default Background;
