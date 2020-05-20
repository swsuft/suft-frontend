import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SettingsRes } from '../../../assets/icons/settings.svg';

const SettingsStyle = styled(SettingsRes)<{ size: string }>`
    width: ${(props) => props.size};
    height: ${(props) => props.size};
`;

interface SettingsProps {
    readonly size: string;
}

const SettingsIcon: React.FC<SettingsProps> = ({ size }) => {
    return <SettingsStyle size={size} />;
};

export default SettingsIcon;
