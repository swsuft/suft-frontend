import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import { useProfile } from '../../hooks/useProfile';
import SubjectOption from '../../atomics/SelectOptions/SubjectOption/SubjectOption';
import GradeOption from '../../atomics/SelectOptions/GradeOption';
import TimesOption from '../../atomics/SelectOptions/TimesOption';
import useToken from '../../hooks/useToken';
import ProblemEditor from '../ProblemEditor';
import ProblemApi from '../../api/Problem';

const InputStyle = styled.input`
    border: none;
    border-radius: 10px;

    width: 250px;
    height: 30px;

    margin-top: 10px;
    padding-left: 10px;
`;

const SelectStyle = styled.select`
    border: none;
    border-radius: 10px;
    appearance: none;

    width: 200px;
    height: 30px;

    margin-top: 10px;
    padding-left: 10px;
`;

const ButtonStyle = styled.button`
    margin-top: 10px;
    border: none;
    border-radius: 10px;
    width: 150px;
    height: 35px;
    color: #ffffff;
    background: var(--color-blue);
    cursor: pointer;
`;

const CreateEditor: React.FC = () => {
    const profile = useProfile();
    const refreshToken = useToken();

    const editorRef = useRef<Editor>();

    const [answer, setAnswer] = useState('');
    const [author, setAuthor] = useState(profile.data!.name);
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    const [times, setTimes] = useState('');

    const addProblem = () => {
        if (editorRef.current === undefined) return;
        if (answer === '' || subject === '' || grade === '' || times === '') {
            alert('빈 칸이 있습니다.');
            return;
        }

        const html = editorRef.current.getInstance().getHtml();

        const problemData = {
            author: author !== '' ? author : '익명',
            contents: html,
            answer,
            subject,
            grade,
            times
        };

        ProblemApi.create(problemData).then(() => {
            alert('문제 등록 완료!');
        });

        setAnswer('');

        refreshToken();
    };

    /*
        editorRef.current.getInstance().getHtml()를 통해 HTML를 받아오고
        DB에는 원래 쓰던데로 저장
        불러올 때는 Viewer를 통해서 초기값에 HTML 값을 넣어주면 됨.

        TODO: 컬러 스키마, 코드 하이라이팅 익스텐션 추가하기
     */

    return (
        <>
            <ProblemEditor editorRef={editorRef} />

            <div>
                <InputStyle id="answer" value={answer} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setAnswer(evt.target.value)} placeholder="문제 정답" />
                &nbsp;
                <InputStyle id="author" value={author} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setAuthor(evt.target.value)} placeholder="출제자 (미입력 시 익명으로 등록)" />
            </div>

            <div>
                <SelectStyle id="subject" value={subject} onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => setSubject(evt.target.value)}>
                    <option value="">과목</option>
                    <SubjectOption />
                </SelectStyle>
                &nbsp;
                <SelectStyle id="grade" value={grade} onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => setGrade(evt.target.value)}>
                    <option value="">학년</option>
                    <GradeOption />
                </SelectStyle>
                &nbsp;
                <SelectStyle id="times" value={times} onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => setTimes(evt.target.value)}>
                    <option value="">학기</option>
                    <TimesOption />
                </SelectStyle>
            </div>

            <ButtonStyle onClick={addProblem}>등록</ButtonStyle>
        </>
    );
};

export default CreateEditor;
