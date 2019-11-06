import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faSchool, faScroll, faUniversity, faUtensils } from '@fortawesome/free-solid-svg-icons';
import Logout from '../Logout';
import BasicSubjectCbt from './BasicSubjectCbt';
import MajorSubjectCbt from './MajorSubjectCbt';
import Meal from './Meal';
import MainMenuStatus, { MainMenuStatusType } from '../../constants/MainMenuStatus';

const MenuStyle = styled.div`
    display: flex;
    width: 980px;
    height: 550px;
    background-color: #ffffff;
    border-radius: 30px;
    box-shadow: 5px 5px 20px 5px #cbcbcb;
    text-align: center;

    @media screen and (max-width: 420px) {
        display: block;
        width: 80vw;
        height: 100%;
    }
`;

const MenuTitleStyle = styled.div`
    font-family: 'Gugi';
    font-size: 40px;

    margin-top: -40px;
    margin-bottom: 30px;

    @media screen and (max-width: 420px) {
        margin-top: auto;
    }
`;

const SideBarWrap = styled.div`
    max-width: 30%;
    flex: 0 0 30%;
    margin: auto;

    @media screen and (max-width: 420px) {
        flex: none;
        max-width: none;
    }
`;

const SideBarStyle = styled.ul`
    list-style: none;
`;

const SideBarItemStyle = styled.li`
    font-size: 18px;
    color: var(--color-gray-text);
    padding: 1rem 15px;
    text-decoration: none;

    &:hover {
        border-radius: 10px;
        background-color: #eaeaea;
        cursor: pointer;
    }

    @media screen and (max-width: 420px) {
        padding: 0.1rem;
    }
`;

const HyperLinkStyle = styled.a`
    text-decoration: none;
`;

const ContentStyle = styled.div`
    margin: auto;
    flex: 1;
`;

const MainMenu: React.FC = () => {
    const [menu, setMenu] = useState<MainMenuStatusType>(MainMenuStatus.MEAL_MENU);

    let contents;
    switch (menu) {
        case MainMenuStatus.MEAL_MENU:
            contents = <Meal />;
            break;
        case MainMenuStatus.BASIC_SUBJECT_MENU:
            contents = <BasicSubjectCbt />;
            break;
        case MainMenuStatus.MAJOR_SUBJECT_MENU:
            contents = <MajorSubjectCbt />;
            break;
        case MainMenuStatus.PREPARING_MENU:
            contents = <h2>아이디어를 주세요!</h2>;
            break;
        default:
            contents = <Meal />;
            break;
    }

    return (
        <MenuStyle>
            <SideBarWrap>
                <MenuTitleStyle>수프트</MenuTitleStyle>
                <SideBarStyle>
                    <SideBarItemStyle onClick={() => setMenu(MainMenuStatus.MEAL_MENU)}>
                        <FontAwesomeIcon icon={faUtensils} /> 급식
                    </SideBarItemStyle>

                    <SideBarItemStyle onClick={() => setMenu(MainMenuStatus.BASIC_SUBJECT_MENU)}>
                        <FontAwesomeIcon icon={faSchool} /> 문제풀이-일반
                    </SideBarItemStyle>

                    <SideBarItemStyle onClick={() => setMenu(MainMenuStatus.MAJOR_SUBJECT_MENU)}>
                        <FontAwesomeIcon icon={faUniversity} /> 문제풀이-전공
                    </SideBarItemStyle>

                    <SideBarItemStyle onClick={() => setMenu(MainMenuStatus.PREPARING_MENU)}>
                        <FontAwesomeIcon icon={faQuestion} /> 준비중
                    </SideBarItemStyle>

                    <SideBarItemStyle>
                        <Logout styling={false} />
                    </SideBarItemStyle>
                </SideBarStyle>
            </SideBarWrap>

            <ContentStyle>{contents}</ContentStyle>
        </MenuStyle>
    );
};

export default MainMenu;
