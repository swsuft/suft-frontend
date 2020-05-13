import React, { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import styled from 'styled-components';
import FontedTitle from '../../atomics/Typography/FontedTitle';
import ProblemEditor from '../../components/ProblemEditor';
import MyProblemLayout from '../../layouts/MyProblemLayout';
import SmallInput from '../../atomics/SmallInput';
import SmallSelect from '../../atomics/SmallSelect';
import GradeOption from '../../atomics/SelectOptions/GradeOption';
import TimesOption from '../../atomics/SelectOptions/TimesOption';
import SmallButton from '../../atomics/SmallButton';
import DynamicSubject from '../../utils/DynamicSubject';

const SmallSelectStyle = styled(SmallSelect)`
    width: 100px;
`;

const SmallButtonStyle = styled(SmallButton)`
    margin-top: 10px;
`;

const MyProblemCreate: React.FC = () => {
    const editorRef = useRef<Editor>();

    const [answer, setAnswer] = useState<string>('');
    const [grade, setGrade] = useState<string>('');
    const [times, setTimes] = useState<string>('');
    const [subject, setSubject] = useState<string>('');

    return (
        <MyProblemLayout>
            <FontedTitle>문제 등록</FontedTitle>
            <ProblemEditor editorRef={editorRef} />
            <div>
                <SmallInput
                  placeholder="문제 정답"
                  value={answer}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setAnswer(evt.target.value)}
                />
                &nbsp;
                <SmallSelectStyle
                  value={grade}
                  onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => setGrade(evt.target.value)}
                >
                    <option value="">학년</option>
                    <GradeOption />
                </SmallSelectStyle>
                &nbsp;
                <SmallSelectStyle
                  value={times}
                  onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => setTimes(evt.target.value)}
                >
                    <option value="">학기</option>
                    <TimesOption />
                </SmallSelectStyle>
                &nbsp;
                <SmallSelect
                  value={subject}
                  onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => setSubject(evt.target.value)}
                >
                    <DynamicSubject current={grade} />
                </SmallSelect>
                <br />
                <SmallButtonStyle background="var(--color-blue)">등록</SmallButtonStyle>
            </div>
            <br />
        </MyProblemLayout>
    );
};

export default MyProblemCreate;
