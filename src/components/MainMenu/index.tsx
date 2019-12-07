import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChalkboard,
    faInfo,
    faLaptopCode,
    faPaperPlane,
    faQuestion,
    faSignOutAlt,
    faUtensils
} from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import CardText from '../../atoms/MainMenu/CardText';
import Meal from './Meal';

const CardListStyle = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
`;

const MealIconStyle = styled(FontAwesomeIcon)`
    position: absolute;
    opacity: 0.1;
    margin-left: 50px;
    margin-top: 20px;
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
                    <Card width="150px" height="150px" isButton>
                        <FontAwesomeIcon icon={faInfo} size="2x"/>
                        <CardText>소개</CardText>
                    </Card>

                    <Card width="150px" height="150px" isButton>
                        <FontAwesomeIcon icon={faPaperPlane} size="2x"/>
                        <CardText>문의</CardText>
                    </Card>

                    <Card width="150px" height="150px" isButton>
                        <FontAwesomeIcon icon={faSignOutAlt} size="2x"/>
                        <CardText>로그아웃</CardText>
                    </Card>
                </CardListStyle>

                <Card height="180px">
                    공지사항
                </Card>
            </div>

            <Card width="390px" height="520px">
                <Meal/>
                <MealIconStyle icon={faUtensils} size="10x"/>
            </Card>
        </>
    );
};

export default MainMenu;
