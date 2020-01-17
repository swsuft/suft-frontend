import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import AdminSideBar from '../components/Admin/SideBar';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';
import { AdminMenuStatusType } from '../constants/AdminMenuStatus';
import useAdmin from '../hooks/useAdmin';

const AdminStyle = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    width: 100%;
`;

const AdminWrapStyle = styled.div`
    display: flex;

    @media screen and (max-width: 420px) {
        display: block;
    }
`;

const AdminContentsStyle = styled.div`
    flex: 1;
`;

const WarningStyle = styled.div`
    text-align: center;
`;

interface AdminLayoutProps {
    readonly setNowMenu: React.Dispatch<React.SetStateAction<AdminMenuStatusType>>;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, setNowMenu }) => {
    const isAdmin = useAdmin();

    if (isAdmin) {
        return (
            <AdminStyle>
                <AdminWrapStyle>
                    <AdminSideBar setNowMenu={setNowMenu}/>

                    <AdminContentsStyle>{children}</AdminContentsStyle>
                </AdminWrapStyle>

                <Footer/>
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
        </AdminStyle>
    );
};

export default AdminLayout;
