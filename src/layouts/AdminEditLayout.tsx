import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import Background from '../utils/Background';
import { useProfile } from '../hooks/useProfile';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';

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
    const profile = useProfile();
    const [isAdmin, setBeAdmin] = useState<boolean>(false);

    useEffect(() => {
        if (profile !== undefined && profile.isAdmin) {
            setBeAdmin(true);
        }
    }, [profile]);

    if (isAdmin) {
        return (
            <AdminStyle>
                <AdminContentsStyle>{children}</AdminContentsStyle>

                <Footer />
                <Background color="#f1f2f6" />
            </AdminStyle>
        );
    }

    return (
        <AdminStyle>
            <CenterContainer>
                <WarningStyle>
                    <FontAwesomeIcon icon={faShieldAlt} size="10x" />
                    <br />
                    <br />
                    <h1>이걸 보고 있다면 당신은 접근 권한이 없어요!</h1>
                    <h4>충분한 권한이 있는데 이 페이지가 표시된다면 하단 문의하기를 통해 알려주세요.</h4>
                </WarningStyle>
            </CenterContainer>

            <Footer />
            <Background color="#f1f2f6" />
        </AdminStyle>
    );
};

export default AdminEditLayout;
