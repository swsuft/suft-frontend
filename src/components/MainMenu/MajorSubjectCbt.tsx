import React, { useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import GetToken from '../../utils/GetToken';
import MajorSubjectOption from '../SelectOptions/SubjectOption/MajorSubjectOption';
import GradeOption from '../SelectOptions/GradeOption';
import TimesOption from '../SelectOptions/TimesOption';

const SelectStyle = styled.select`
    border: none;
    border-radius: 20px;
    width: 30%;
    height: 45px;
    padding-left: 20px;
    appearance: none;
    margin-bottom: 10px;
    background-color: var(--color-background);
`;

const ButtonStyle = styled.button`
    width: 35%;
    height: 40px;
    margin-top: 25px;

    font-size: 18px;
    font-weight: 700;

    border: none;
    border-radius: 20px;

    color: #000;
    background-color: var(--color-yellow);
    cursor: pointer;
`;

const BrStyle = styled.div`
    margin: 10px auto;

    @media screen and (max-width: 420px) {
        margin: 8px auto;
    }
`;

const MajorSubjectCbt: React.FC<RouteComponentProps> = ({ history }) => {
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    const [times, setTimes] = useState('');

    const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        if (evt.target.id === 'subject') {
            setSubject(evt.target.value);
        } else if (evt.target.id === 'grade') {
            setGrade(evt.target.value);
        } else if (evt.target.id === 'times') {
            setTimes(evt.target.value);
        }
    };

    const onStartButtonClick = () => {
        if (subject === '' || grade === '' || times === '') {
            alert('설정 되지 않는 항목이 있습니다.');
            return;
        }

        history.push(`/cbt/${subject}/${grade}/${times}`);
        GetToken();
    };

    return (
        <>
            <h2>
                전공과목 <FontAwesomeIcon icon={faUniversity} size="sm" />{' '}문제풀이
            </h2>

            <BrStyle />

            <p>과목</p>
            <SelectStyle
              id="subject"
              value={subject}
              onChange={onSelectChange}
            >
                <option value="">과목</option>
                <MajorSubjectOption />
            </SelectStyle>

            <BrStyle />

            <p>학년</p>
            <SelectStyle id="grade" value={grade} onChange={onSelectChange}>
                <option value="">학년</option>
                <GradeOption />
            </SelectStyle>

            <BrStyle />

            <p>학기</p>
            <SelectStyle id="times" value={times} onChange={onSelectChange}>
                <option value="">학기</option>
                <TimesOption />
            </SelectStyle>

            <div>
                <ButtonStyle onClick={onStartButtonClick}>
                    <FontAwesomeIcon icon={faPlayCircle} /> 시작하기
                </ButtonStyle>
            </div>
        </>
    );
};

export default withRouter(MajorSubjectCbt);
