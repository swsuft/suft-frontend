import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const BackStyle = styled(FontAwesomeIcon)`
    color: var(--color-gray-text);

    &:hover {
        color: var(--color-gray-background);
        cursor: pointer;
    }
`;

interface BackProps {
    readonly onClick?: React.MouseEventHandler;
}

const BackIcon: React.FC<BackProps> = ({ onClick }) => {
    return <BackStyle icon={faTimes} onClick={onClick} />;
};

export default BackIcon;
