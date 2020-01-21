import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SettingsIcon } from '../../../assets/icons/settings.svg';

const SettingsStyle = styled(SettingsIcon)<{ size: string }>`
    width: ${(props) => props.size};
    height: ${(props) => props.size};
`;

interface SettingsProps {
    readonly size: string;
}

const Settings: React.FC<SettingsProps> = ({ size }) => {
    return <SettingsStyle size={size} />;
};

export default Settings;
