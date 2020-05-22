import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const IconStyle = styled(FontAwesomeIcon)`
    color: var(--color-gray-text);
    cursor: pointer;
    &:hover {
        color: var(--color-gray-background);
    }
`;

const EditIcon: React.FC<{ onClick?: React.MouseEventHandler }> = ({ onClick, ...props }) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <IconStyle icon={faEdit} onClick={onClick} {...props} />;
};

export default EditIcon;
