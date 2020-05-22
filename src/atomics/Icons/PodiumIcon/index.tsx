import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PodiumRes } from '../../../assets/icons/podium.svg';

const PodiumStyle = styled(PodiumRes)<{ size: string }>`
    width: ${(props) => props.size};
    height: ${(props) => props.size};
`;

interface PodiumProps {
    readonly size: string;
}

const PodiumIcon: React.FC<PodiumProps> = ({ size }) => {
    return <PodiumStyle size={size} />;
};

export default PodiumIcon;
