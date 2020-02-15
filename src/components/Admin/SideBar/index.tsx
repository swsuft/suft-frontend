import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Logout from '../../Logout';
import AdminMenuStatus, { AdminMenuStatusType } from '../../../constants/AdminMenuStatus';

const SideBarWrapStyle = styled.div`
    max-width: 13%;
    min-height: 100vh;
    flex: 0 0 13%;
    background-color: var(--color-dark);

    @media screen and (max-width: 420px) {
        max-width: none;
        flex: none;
        width: 100vw;
        height: 320px;
    }
`;

const MainTitleStyle = styled.p`
    font-family: 'Gugi';
    font-size: 38px;
    text-align: center;
    color: #ffffff;
    margin-top: 2px;
`;

const SideBarTitleStyle = styled.p`
    font-size: 18px;
    color: #ffffff;
    margin: 10px auto auto 10px;
`;

const SideBarUlStyle = styled.ul`
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
        <SideBarWrapStyle>
            <MainTitleStyle>ADMIN</MainTitleStyle>

            <SideBarTitleStyle>문제풀이</SideBarTitleStyle>
            <SideBarUlStyle>
                <SideBarItemStyle id="problem" onClick={() => setNowMenu(AdminMenuStatus.ADMIN_PROBLEM)}>
                    문제 등록
                </SideBarItemStyle>
                <SideBarItemStyle id="view" onClick={() => setNowMenu(AdminMenuStatus.ADMIN_VIEW)}>
                    문제 관리
                </SideBarItemStyle>
            </SideBarUlStyle>

            <SideBarTitleStyle>유저관리</SideBarTitleStyle>
            <SideBarUlStyle>
                <SideBarItemStyle id="userblock" onClick={() => setNowMenu(AdminMenuStatus.ADMIN_USERBLOCK)}>
                    차단 설정
                </SideBarItemStyle>
            </SideBarUlStyle>

            <br />
            <Logout styling>
                <FontAwesomeIcon icon={faSignOutAlt} /> 로그아웃
            </Logout>
        </SideBarWrapStyle>
    );
};

export default AdminSideBar;
