import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import Background from '../utils/Background';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';
import useAdmin from '../hooks/useAdmin';

const AdminStyle = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
`;

const AdminContentsStyle = styled.div`
    flex: 1;
`;

const WarningStyle = styled.div`
    text-align: center;
`;

const AdminEditLayout: React.FC = ({ children }) => {
    const isAdmin = useAdmin();

    if (isAdmin) {
        return (
            <AdminStyle>
                <AdminContentsStyle>{children}</AdminContentsStyle>

                <Footer/>
                <Background color="#f1f2f6"/>
            </AdminStyle>
        );
    }

    return (
        <AdminStyle>
            <CenterContainer>
                <WarningStyle>
                    <FontAwesomeIcon icon={faShieldAlt} size="10x"/>
                    <br/>
                    <br/>
                    <h1>이걸 보고 있다면 당신은 접근 권한이 없어요!</h1>
                    <h4>충분한 권한이 있는데 이 페이지가 표시된다면 하단 문의하기를 통해 알려주세요.</h4>
                </WarningStyle>
            </CenterContainer>

            <Footer/>
            <Background color="#f1f2f6"/>
        </AdminStyle>
    );
};

export default AdminEditLayout;
