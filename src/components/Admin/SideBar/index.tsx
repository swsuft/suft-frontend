import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Logout from '../../Logout';
import AdminMenuStatus, { AdminMenuStatusType } from '../../../constants/AdminMenuStatus';

const SideBarContainer = styled.div`
    max-width: 13%;
    min-height: 100vh;
    flex: 0 0 13%;
    background-color: var(--color-dark);

    @media screen and (max-width: 420px) {
        max-width: none;
        flex: none;
        width: 100vw;
        min-height: 100%;
        padding-bottom: 1rem;
    }
`;

const MenuTitleStyle = styled.p`
    font-size: 20px;
    color: #ffffff;
    margin: 10px 0 0 10px;
    
    @media screen and (max-width: 420px) {
        margin: 0 0 0 10px;
    }
`;

const SideBarMenuStyle = styled.ul`
    list-style: none;
`;

const SideBarItemStyle = styled.li`
    font-size: 15px;
    padding: 3px 15px;
    color: var(--color-gray-text);

    &:hover {
        border-radius: 10px;
        background-color: #1e2425;
        cursor: pointer;
    }
`;

interface AdminSideBarProps {
    readonly setNowMenu: React.Dispatch<React.SetStateAction<AdminMenuStatusType>>;
}

const AdminSideBar: React.FC<AdminSideBarProps> = ({ setNowMenu }) => {
    return (
        <SideBarContainer>
            <MenuTitleStyle>문제풀이</MenuTitleStyle>
            <SideBarMenuStyle>
                <SideBarItemStyle id="problem" onClick={() => setNowMenu(AdminMenuStatus.ADMIN_PROBLEM)}>
                    새 문제 등록
                </SideBarItemStyle>
                <SideBarItemStyle id="view" onClick={() => setNowMenu(AdminMenuStatus.ADMIN_VIEW)}>
                    문제 관리
                </SideBarItemStyle>
            </SideBarMenuStyle>

            <MenuTitleStyle>유저관리</MenuTitleStyle>
            <SideBarMenuStyle>
                <SideBarItemStyle id="user-block" onClick={() => setNowMenu(AdminMenuStatus.ADMIN_USERBLOCK)}>
                    유저 관리
                </SideBarItemStyle>
                <SideBarItemStyle id="waiting-user" onClick={() => setNowMenu(AdminMenuStatus.ADMIN_WAITINGUSER)}>
                    가입 수락
                </SideBarItemStyle>
            </SideBarMenuStyle>

            <br />
            <Logout styling>
                <FontAwesomeIcon icon={faSignOutAlt} /> 로그아웃
            </Logout>
        </SideBarContainer>
    );
};

export default AdminSideBar;
