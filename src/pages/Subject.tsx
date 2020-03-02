import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Container from '../utils/ContainerUtils/Container';
import FontedTitle from '../atomics/Typography/FontedTitle';
import FontedMiddleText from '../atomics/Typography/FontedMiddleText';
import SubjectOption from '../atomics/SelectOptions/SubjectOption/SubjectOption';
import GradeOption from '../atomics/SelectOptions/GradeOption';
import TimesOption from '../atomics/SelectOptions/TimesOption';
import LabelText from '../atomics/Typography/LabelText';
import DefaultLayout from '../layouts/DefaultLayout';
import Select from '../atomics/Select';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';
import Login from '../components/Login';
import { useProfile } from '../hooks/useProfile';

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
    left: 600px;
    right: 0;
    bottom: 0;
    transform: rotate(-30deg);

    @media screen and (max-width: 1000px) {
        display: none;
    }
`;

const Subject: React.FC<RouteComponentProps> = ({ history }) => {
    const profile = useProfile();
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    const [times, setTimes] = useState('');

    if (profile !== undefined && !profile.success) {
        return (
            <DefaultLayout>
                <CenterContainer>
                    <Login />
                </CenterContainer>
            </DefaultLayout>
        );
    }

    const onStartButtonClick = () => {
        if (subject === '' || grade === '' || times === '') {
            alert('설정 되지 않는 항목이 있습니다.');
            return;
        }

        history.push(`/cbt/${subject}/${grade}/${times}`);
    };

    return (
        <DefaultLayout>
            <Container>
                <FontedTitle>문제풀이 시작하기</FontedTitle>
                <FontedMiddleText>※ 자격증은 학년, 학기를 기타 카테고리로 선택하여 풀 수 있습니다.</FontedMiddleText>

                <BodyStyle>
                    <LabelText>학년</LabelText>
                    <Select value={grade} onChange={(e) => setGrade(e.target.value)}>
                        <option value="">학년을 선택해주세요.</option>
                        <GradeOption />
                    </Select>

                    <LabelText>과목</LabelText>
                    <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
                        <option value="">과목을 선택해주세요.</option>
                        <SubjectOption />
                    </Select>

                    <LabelText>학기</LabelText>
                    <Select value={times} onChange={(e) => setTimes(e.target.value)}>
                        <option value="">학기를 선택해주세요.</option>
                        <TimesOption />
                    </Select>

                    <div>
                        <ButtonStyle onClick={onStartButtonClick}>
                            <FontAwesomeIcon icon={faPlayCircle} /> 시작하기
                        </ButtonStyle>
                    </div>
                </BodyStyle>

                <IconStyle icon={faChalkboard} />
            </Container>
        </DefaultLayout>
    );
};

export default withRouter(Subject);
