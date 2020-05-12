import React, { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import styled from 'styled-components';
import FontedTitle from '../../atomics/Typography/FontedTitle';
import ProblemEditor from '../../components/ProblemEditor';
import MyProblemLayout from '../../layouts/MyProblemLayout';
import SmallInput from '../../atomics/SmallInput';
import SmallSelect from '../../atomics/SmallSelect';
import SubjectOption from '../../atomics/SelectOptions/SubjectOption/SubjectOption';
import GradeOption from '../../atomics/SelectOptions/GradeOption';
import TimesOption from '../../atomics/SelectOptions/TimesOption';
import SmallButton from '../../atomics/SmallButton';

const SmallSelectStyle = styled(SmallSelect)`
    width: 100px;
`;

const SmallButtonStyle = styled(SmallButton)`
    margin-top: 10px;
`;

const MyProblemCreate: React.FC = () => {
    const editorRef = useRef<Editor>();

    return (
        <MyProblemLayout>
            <FontedTitle>문제 등록</FontedTitle>
            <ProblemEditor editorRef={editorRef} />
            <div>
                <SmallInput id="answer" placeholder="문제 정답" />
                &nbsp;
                <SmallSelect id="subject">
                    <option value="">과목</option>
                    <SubjectOption />
                </SmallSelect>
                &nbsp;
                <SmallSelectStyle id="grade">
                    <option value="">학년</option>
                    <GradeOption />
                </SmallSelectStyle>
                &nbsp;
                <SmallSelectStyle id="times">
                    <option value="">학기</option>
                    <TimesOption />
                </SmallSelectStyle>
                <SmallButtonStyle background="var(--color-blue)">등록</SmallButtonStyle>
            </div>
        </MyProblemLayout>
    );
};

export default MyProblemCreate;
