import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChalkboard,
    faInfo,
    faLaptopCode,
    faMedal,
    faSignOutAlt,
    faUtensils
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import Card from '../Card';
import CardText from '../../../atoms/MainMenu/CardText';
import Meal from '../Meal';
import Logout from '../../Logout';
import NoStyleA from '../../../atoms/NoStyleA';
import NoStyleLink from '../../../atoms/NoStyleLink';

const WapperStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const CardListStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const MealIconStyle = styled(FontAwesomeIcon)`
    position: relative;
    opacity: 0.1;
    top: -190px;
    left: 240px;
    right: 0;
    bottom: 0;
`;

const MobileMainMenu: React.FC = () => {
    return (
        <WapperStyle>
            <CardListStyle>
                <NoStyleLink to="/basic">
                    <Card width="130px" height="130px" isButton>
                        <FontAwesomeIcon icon={faChalkboard} size="2x"/>
                        <CardText>일반과목CBT</CardText>
                    </Card>
                </NoStyleLink>


                <NoStyleLink to="/major">
                    <Card width="130px" height="130px" isButton isMobile>
                        <FontAwesomeIcon icon={faLaptopCode} size="2x"/>
                        <CardText>전공과목CBT</CardText>
                    </Card>
                </NoStyleLink>
            </CardListStyle>

            <CardListStyle>
                <NoStyleLink to="/rank">
                    <Card width="130px" height="130px" isButton>
                        <FontAwesomeIcon icon={faMedal} size="2x"/>
                        <CardText>기여순위</CardText>
                    </Card>
                </NoStyleLink>

                <NoStyleLink to="/info">
                    <Card width="130px" height="130px" isButton isMobile>
                        <FontAwesomeIcon icon={faInfo} size="2x"/>
                        <CardText>소개</CardText>
                    </Card>
                </NoStyleLink>
            </CardListStyle>

            <CardListStyle>
                <NoStyleA href="https://www.facebook.com/swsuft" target="_blank" rel="noreferrer noopener">
                    <Card width="130px" height="130px" isButton>
                        <FontAwesomeIcon icon={faFacebook} size="2x"/>
                        <CardText>페이스북</CardText>
                    </Card>
                </NoStyleA>

                <Logout>
                    <Card width="130px" height="130px" isButton isMobile>
                        <FontAwesomeIcon icon={faSignOutAlt} size="2x"/>
                        <CardText>로그아웃</CardText>
                    </Card>
                </Logout>
            </CardListStyle>

            <Card height="180px" isMobile>
                공지사항
            </Card>

            <Card width="390px" height="500px" isMobile>
                <Meal/>
            </Card>
            <MealIconStyle icon={faUtensils} size="10x"/>
        </WapperStyle>
    );
};

export default MobileMainMenu;
