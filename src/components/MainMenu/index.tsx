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
import Card from './Card';
import CardText from '../../atoms/MainMenu/CardText';
import Meal from './Meal';
import Logout from '../Logout';
import NoStyleA from '../../atoms/NoStyleA';
import NoStyleLink from '../../atoms/NoStyleLink';

const WapperStyle = styled.div`
    display: flex;
    flex-direction: row;
`;

const CardListStyle = styled.div`
    display: flex;
    flex-direction: row;
`;

const MealIconStyle = styled(FontAwesomeIcon)`
    position: relative;
    opacity: 0.1;
    top: 350px;
    left: -150px;
    right: 0;
    bottom: 0;
`;

const MainMenu: React.FC = () => {
    return (
        <WapperStyle>
            <div>
                <CardListStyle>
                    <NoStyleLink to="/basic">
                        <Card width="150px" height="150px" isButton>
                            <FontAwesomeIcon icon={faChalkboard} size="2x"/>
                            <CardText>일반과목CBT</CardText>
                        </Card>
                    </NoStyleLink>


                    <NoStyleLink to="/major">
                        <Card width="150px" height="150px" isButton>
                            <FontAwesomeIcon icon={faLaptopCode} size="2x"/>
                            <CardText>전공과목CBT</CardText>
                        </Card>
                    </NoStyleLink>

                    <NoStyleLink to="/rank">
                        <Card width="150px" height="150px" isButton>
                            <FontAwesomeIcon icon={faMedal} size="2x"/>
                            <CardText>기여순위</CardText>
                        </Card>
                    </NoStyleLink>
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

            <Card width="390px" height="520px" isLast>
                <Meal/>
            </Card>
            <MealIconStyle icon={faUtensils} size="10x"/>
        </WapperStyle>
    );
};

export default MainMenu;
