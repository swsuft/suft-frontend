import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import CenterContainer from '../../../utils/ContainerUtils/CenterContainer';

const WarningStyle = styled.div`
    text-align: center;
`;

const NoPermissionError: React.FC = () => {
    return (
        <CenterContainer>
            <WarningStyle>
                <FontAwesomeIcon icon={faShieldAlt} size="10x" />
                <br />
                <br />
                <h1>이걸 보고 있다면 당신은 접근 권한이 없어요!</h1>
                <h4>충분한 권한이 있는데 이 페이지가 표시된다면 하단 문의하기를 통해 알려주세요.</h4>
            </WarningStyle>
        </CenterContainer>
    );
};

export default NoPermissionError;
