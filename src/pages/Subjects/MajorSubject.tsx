import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import CbtLayout from '../../layouts/CbtLayout';
import Container from '../../utils/ContainerUtils/Container';
import FontedTitle from '../../atoms/Typography/FontedTitle';
import FontedMiddleText from '../../atoms/Typography/FontedMiddleText';
import GradeOption from '../../components/SelectOptions/GradeOption';
import TimesOption from '../../components/SelectOptions/TimesOption';
import LableText from '../../atoms/Typography/LableText';
import GetToken from '../../utils/GetToken';
import MajorSubjectOption from '../../components/SelectOptions/SubjectOption/MajorSubjectOption';

const SelectStyle = styled.select`
    border: none;
    border-radius: 20px;
    width: 340px;
    height: 45px;
    padding-left: 20px;
    appearance: none;
    margin-bottom: 10px;
    background-color: white;
`;

const BodyStyle = styled.div`
    margin-top: 50px;
`;

const ButtonStyle = styled.button`
    width: 340px;
    height: 40px;
    margin-top: 25px;

    font-size: 18px;
    font-weight: 700;

    border: none;
    border-radius: 20px;

    color: black;
    background-color: var(--color-yellow);
    cursor: pointer;
    z-index: 2;
`;

const IconStyle = styled(FontAwesomeIcon)`
    position: relative;
    font-size: 250px;
    opacity: 0.1;
    top: -50px;
    left: 700px;
    right: 0;
    bottom: 0;
    transform: rotate(-30deg);
    
    @media screen and (max-width: 900px) {
        display: none;
    }
`;

const MajorSubject: React.FC<RouteComponentProps> = ({ history }) => {
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    const [times, setTimes] = useState('');

    const onStartButtonClick = () => {
        if (subject === '' || grade === '' || times === '') {
            alert('설정 되지 않는 항목이 있습니다.');
            return;
        }

        history.push(`/cbt/${subject}/${grade}/${times}`);
        GetToken();
    };

    return (
        <CbtLayout>
            <Container>
                <FontedTitle>전공과목 CBT 시작하기</FontedTitle>
                <FontedMiddleText>※ 정보처리와 관리는 교양과목으로 “일반과목CBT”로 시작할 수 있습니다.</FontedMiddleText>

                <BodyStyle>
                    <LableText>학년</LableText>
                    <SelectStyle value={grade} onChange={(e) => setGrade(e.target.value)}>
                        <option value="">학년을 선택해주세요.</option>
                        <GradeOption/>
                    </SelectStyle>

                    <LableText>과목</LableText>
                    <SelectStyle value={subject} onChange={(e) => setSubject(e.target.value)}>
                        <option value="">과목을 선택해주세요.</option>
                        <MajorSubjectOption/>
                    </SelectStyle>

                    <LableText>학기</LableText>
                    <SelectStyle value={times} onChange={(e) => setTimes(e.target.value)}>
                        <option value="">학기를 선택해주세요.</option>
                        <TimesOption/>
                    </SelectStyle>

                    <div>
                        <ButtonStyle onClick={onStartButtonClick}>
                            <FontAwesomeIcon icon={faPlayCircle}/> 시작하기
                        </ButtonStyle>
                    </div>
                </BodyStyle>

                <IconStyle icon={faLaptopCode}/>
            </Container>
        </CbtLayout>
    );
};

export default withRouter(MajorSubject);
