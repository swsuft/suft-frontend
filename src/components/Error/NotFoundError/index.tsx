import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
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

const NotFoundError: React.FC = () => {
    return (
        <ErrorContainer>
            <CenterContainer>
                <WarningStyle>
                    <FontAwesomeIcon icon={faQuestion} size="10x" />
                    <br />
                    <br />
                    <ErrorTitle>404 페이지없음!</ErrorTitle>
                    <h1>페이지를 찾을 수 없어요</h1>
                    <h3>주소가 잘못되거나 존재하지 않는 페이지이에요</h3>
                </WarningStyle>
            </CenterContainer>
            <Footer />
        </ErrorContainer>
    );
};

export default NotFoundError;
