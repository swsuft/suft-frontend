import React, { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import styled from 'styled-components';
import cogoToast from 'cogo-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import FontedTitle from '../../atomics/Typography/FontedTitle';
import ProblemEditor from '../../components/ProblemEditor';
import MyProblemLayout from '../../layouts/MyProblemLayout';
import SmallInput from '../../atomics/SmallInput';
import SmallSelect from '../../atomics/SmallSelect';
import GradeOption from '../../atomics/SelectOptions/GradeOption';
import TimesOption from '../../atomics/SelectOptions/TimesOption';
import SmallButton from '../../atomics/SmallButton';
import DynamicSubject from '../../utils/DynamicSubject';
import { useProfile } from '../../hooks/useProfile';
import { getGraphQLError } from '../../api/errorHandler';

const SmallSelectStyle = styled(SmallSelect)`
    width: 100px;
`;

const SmallButtonStyle = styled(SmallButton)`
    margin-top: 10px;
`;

const CREATE_PROBLEM = gql`
    mutation(
        $email: String!
        $contents: String!
        $answer: String!
        $author: String!
        $subject: Int!
        $grade: Int!
        $times: String!
    ) {
        createProblem(
            input: {
                email: $email
                contents: $contents
                answer: $answer
                author: $author
                subject: $subject
                grade: $grade
                times: $times
            }
        ) {
            id
        }
    }
`;

const MyProblemCreate: React.FC = () => {
    const profile = useProfile();

    const editorRef = useRef<Editor | null>(null);
    const [answer, setAnswer] = useState<string>('');
    const [grade, setGrade] = useState<string>('');
    const [times, setTimes] = useState<string>('');
    const [subject, setSubject] = useState<string>('');

    const [createProblemQurey] = useMutation(CREATE_PROBLEM);

    const createProblem = () => {
        if (!editorRef.current) return;
        if (!profile) return;

        if (answer === '' || subject === '' || grade === '' || times === '') {
            cogoToast.warn('빈 칸이 있습니다.');
            return;
        }

        const html = editorRef.current.getInstance().getHtml();

        const problemData = {
            email: profile.email,
            author: profile.name,
            contents: html,
            answer,
            subject: parseInt(subject, 10),
            grade: parseInt(grade, 10),
            times
        };

        createProblemQurey({
            variables: problemData
        })
            .then(() => {
                cogoToast.success('성공적으로 문제를 등록하였습니다.');
                window.location.reload();
            })
            .catch((err) => {
                const gerror = getGraphQLError(err);
                if (!gerror) return;
                cogoToast.error(gerror[1]);
            });
    };

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
                <SmallButtonStyle background="var(--color-blue)" onClick={createProblem}>
                    <FontAwesomeIcon icon={faPencilAlt} /> 등록하기
                </SmallButtonStyle>
            </div>
            <br />
        </MyProblemLayout>
    );
};

export default MyProblemCreate;
