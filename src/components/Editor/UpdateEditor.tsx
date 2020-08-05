import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import cogoToast from 'cogo-toast';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import GradeOption from '../../atomics/SelectOptions/GradeOption';
import TimesOption from '../../atomics/SelectOptions/TimesOption';
import useToken from '../../hooks/useToken';
import ProblemEditor from '../ProblemEditor';
import SmallButton from '../../atomics/SmallButton';
import SmallInput from '../../atomics/SmallInput';
import SmallSelect from '../../atomics/SmallSelect';
import DynamicSubject from '../../utils/DynamicSubject';
import { useProfile } from '../../hooks/useProfile';
import ErrorCode from '../../error/ErrorCode';
import { getGraphQLError } from '../../api/errorHandler';
import useAdmin from '../../hooks/useAdmin';

const SmallButtonStyle = styled(SmallButton)`
    margin-top: 10px;
`;

const SmallSelectStyle = styled(SmallSelect)`
    width: 100px;
`;

interface UpdateEditorProps {
    readonly id: string;
}

const GET_PROBLEM = gql`
    query($id: Int!) {
        problem(id: $id) {
            id
            email
            contents
            answer
            author
            grade
            subject
            times
        }
    }
`;

const UPDATE_PROBLEM = gql`
    mutation($id: Int!, $contents: String!, $answer: String!, $subject: Int!, $grade: Int!, $times: String!) {
        updateProblem(
            id: $id
            input: { contents: $contents, answer: $answer, subject: $subject, grade: $grade, times: $times }
        ) {
            id
        }
    }
`;

const UpdateEditor: React.FC<RouteComponentProps & UpdateEditorProps> = ({ id, history }) => {
    const refreshToken = useToken();
    const profile = useProfile();
    const isAdmin = useAdmin();

    const editorRef = useRef<Editor | null>(null);

    const [answer, setAnswer] = useState('');
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    const [times, setTimes] = useState('');

    const { loading, error, data } = useQuery(GET_PROBLEM, {
        variables: {
            id: parseInt(id, 10)
        },
        fetchPolicy: 'network-only'
    });
    const [updateProblemQurey] = useMutation(UPDATE_PROBLEM);

    useEffect(() => {
        if (!profile) return;
        if (!editorRef.current) return;

        if (loading) {
            cogoToast.loading('작성한 문제를 가져오고 있어요...', {
                hideAfter: 1
            });
            return;
        }

        if (error) {
            const gerror = getGraphQLError(error);
            if (!gerror) return;

            if (gerror[0] === ErrorCode.NO_PERMISSION) {
                refreshToken();
            } else {
                cogoToast.error(gerror[1]);
            }

            return;
        }

        if (!isAdmin && profile.email !== data.problem.email) {
            cogoToast.error('내 문제만 수정할 수 있어요.');
            return;
        }

        // eslint-disable-next-line no-shadow
        const { contents, answer, subject, grade, times } = data.problem;

        setAnswer(answer);
        setSubject(subject);
        setGrade(grade);
        setTimes(times);

        editorRef.current.getInstance().setHtml(contents);
    }, [isAdmin, profile, loading, error, data, id, refreshToken]);

    const updateProblem = () => {
        if (!editorRef.current) return;
        if (!profile) return;

        if (answer === '' || subject === '' || grade === '' || times === '') {
            cogoToast.warn('빈 칸이 있습니다.');
            return;
        }

        const html = editorRef.current.getInstance().getHtml();

        updateProblemQurey({
            variables: {
                id: parseInt(id, 10),
                contents: html,
                answer,
                subject: parseInt(subject, 10),
                grade: parseInt(grade, 10),
                times
            }
        })
            .then(() => {
                cogoToast.success('문제 수정 완료!');
                history.goBack();
            })
            .catch((err) => {
                const gerror = getGraphQLError(err);
                if (!gerror) return;

                cogoToast.error(gerror[1]);
            });
    };

    return (
        <>
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
            </div>

            <SmallButtonStyle background="var(--color-blue)" onClick={updateProblem}>
                수정 완료
            </SmallButtonStyle>
        </>
    );
};

export default withRouter(UpdateEditor);
