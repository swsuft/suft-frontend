import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import CenterContainer from '../../../utils/ContainerUtils/CenterContainer';
import ErrorTitle from '../../../atomics/Typography/ErrorTitle';
import Footer from '../../Footer';

const ErrorContainer = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    width: 100%;
`;

const WarningStyle = styled.div`
    text-align: center;
`;

const NoPermissionError: React.FC = () => {
    return (
        <ErrorContainer>
            <CenterContainer>
                <WarningStyle>
                    <FontAwesomeIcon icon={faTimes} size="10x" />
                    <br />
                    <br />
                    <ErrorTitle>403 권한없음!</ErrorTitle>
                    <h1>해당 페이지에 접근할 권한이 없어요</h1>
                    <h3>관리자만 접근할 수 있는 페이지에요</h3>
                </WarningStyle>
            </CenterContainer>
            <Footer />
        </ErrorContainer>
    );
};

export default NoPermissionError;
