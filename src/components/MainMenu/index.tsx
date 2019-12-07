import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChalkboard,
    faKey,
    faLaptopCode,
    faPaperPlane,
    faQuestion,
    faSignOutAlt
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
                        <FontAwesomeIcon icon={faPaperPlane} size="2x"/>
                        <CardText>문의</CardText>
                    </Card>

                    <Card width="150px" height="150px" isButton>
                        <FontAwesomeIcon icon={faKey} size="2x"/>
                        <CardText>개인정보처리방침</CardText>
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
            </Card>
        </>
    );
};

export default MainMenu;
