import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChalkboard,
    faInfo,
    faLaptopCode,
    faQuestion,
    faSignOutAlt,
    faUtensils
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import Card from './Card';
import CardText from '../../atoms/MainMenu/CardText';
import Meal from './Meal';
import Logout from '../Logout';
import NoStyleA from '../../atoms/NoStyleA';
import NoStyleLink from '../../atoms/NoStyleLink';

const CardListStyle = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
`;

const MealIconStyle = styled(FontAwesomeIcon)`
    position: relative;
    opacity: 0.1;
    top: 350px;
    left: -170px;
    right: 0;
    bottom: 0;
`;

const MainMenu: React.FC = () => {
    return (
        <>
            <div>
                <CardListStyle>
                    <Card width="150px" height="150px" isButton>
                        <FontAwesomeIcon icon={faChalkboard} size="2x"/>
                        <CardText>일반과목CBT</CardText>
                    </Card>


                    <Card width="150px" height="150px" isButton>
                        <FontAwesomeIcon icon={faLaptopCode} size="2x"/>
                        <CardText>전공과목CBT</CardText>
                    </Card>

                    <Card width="150px" height="150px" isButton>
                        <FontAwesomeIcon icon={faQuestion} size="2x"/>
                        <CardText>패치예정</CardText>
                    </Card>
                </CardListStyle>

                <CardListStyle>
                    <NoStyleLink to="/info">
                        <Card width="150px" height="150px" isButton>
                            <FontAwesomeIcon icon={faInfo} size="2x"/>
                            <CardText>소개</CardText>
                        </Card>
                    </NoStyleLink>

                    <NoStyleA href="https://www.facebook.com/swsuft" target="_blank" rel="noreferrer noopener">
                        <Card width="150px" height="150px" isButton>
                            <FontAwesomeIcon icon={faFacebook} size="2x"/>
                            <CardText>페이스북</CardText>
                        </Card>
                    </NoStyleA>

                    <Logout>
                        <Card width="150px" height="150px" isButton>
                            <FontAwesomeIcon icon={faSignOutAlt} size="2x"/>
                            <CardText>로그아웃</CardText>
                        </Card>
                    </Logout>
                </CardListStyle>

                <Card height="180px">
                    공지사항
                </Card>
            </div>

            <Card width="390px" height="520px">
                <Meal/>
            </Card>
            <MealIconStyle icon={faUtensils} size="10x"/>
        </>
    );
};

export default MainMenu;
