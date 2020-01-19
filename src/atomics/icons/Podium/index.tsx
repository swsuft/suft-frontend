import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PodiumIcon } from '../../../assets/icons/podium.svg';

const PodiumStyle = styled(PodiumIcon)<{ size: string }>`
    width: ${(props) => props.size};
    height: ${(props) => props.size};
`;

interface PodiumProps {
    readonly size: string;
}

const Podium: React.FC<PodiumProps> = ({ size }) => {
    return <PodiumStyle size={size} />;
};

export default Podium;
