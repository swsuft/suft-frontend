import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import CenterContainer from '../../../utils/ContainerUtils/CenterContainer';

const WarningStyle = styled.div`
    text-align: center;
`;

const ErrorTitleStyle = styled.span`
    font-size: 2em;
    font-weight: bold;
    color: white;
    background-color: var(--color-red);
    padding: 0 4px;
`;

const NoPermissionError: React.FC = () => {
    return (
        <CenterContainer>
            <WarningStyle>
                <FontAwesomeIcon icon={faTimes} size="10x" />
                <br />
                <br />
                <ErrorTitleStyle>403 권한없음!</ErrorTitleStyle>
                <h1>해당 페이지에 접근할 권한이 없어요</h1>
                <h3>로그인이 되어있지 않거나 관리자가 아니에요</h3>
            </WarningStyle>
        </CenterContainer>
    );
};

export default NoPermissionError;
