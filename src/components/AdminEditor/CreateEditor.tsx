import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import cogoToast from 'cogo-toast';
import { useProfile } from '../../hooks/useProfile';
import SubjectOption from '../../atomics/SelectOptions/SubjectOption/SubjectOption';
import GradeOption from '../../atomics/SelectOptions/GradeOption';
import TimesOption from '../../atomics/SelectOptions/TimesOption';
import useToken from '../../hooks/useToken';
import ProblemEditor from '../ProblemEditor';
import ProblemApi from '../../api/Problem';
import SmallButton from '../../atomics/SmallButton';
import SmallInput from '../../atomics/SmallInput';
import SmallSelect from '../../atomics/SmallSelect';

const SmallButtonStyle = styled(SmallButton)`
    margin-top: 10px;
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
            cogoToast.warn('빈 칸이 있습니다.');
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
            cogoToast.success('문제 등록 완료!');
        });

        setAnswer('');

        refreshToken();
    };

    return (
        <>
            <ProblemEditor editorRef={editorRef} />

            <div>
                <SmallInput
                  id="answer"
                  value={answer}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setAnswer(evt.target.value)}
                  placeholder="문제 정답"
                />
                &nbsp;
                <SmallInput
                  id="author"
                  value={author}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setAuthor(evt.target.value)}
                  placeholder="출제자 (미입력 시 익명으로 등록)"
                />
            </div>

            <div>
                <SmallSelect
                  id="subject"
                  value={subject}
                  onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => setSubject(evt.target.value)}
                >
                    <option value="">과목</option>
                    <SubjectOption />
                </SmallSelect>
                &nbsp;
                <SmallSelect
                  id="grade"
                  value={grade}
                  onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => setGrade(evt.target.value)}
                >
                    <option value="">학년</option>
                    <GradeOption />
                </SmallSelect>
                &nbsp;
                <SmallSelect
                  id="times"
                  value={times}
                  onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => setTimes(evt.target.value)}
                >
                    <option value="">학기</option>
                    <TimesOption />
                </SmallSelect>
            </div>

            <SmallButtonStyle background="var(--color-blue)" onClick={addProblem}>
                등록
            </SmallButtonStyle>
        </>
    );
};

export default CreateEditor;
