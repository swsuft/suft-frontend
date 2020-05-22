import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import cogoToast from 'cogo-toast';
import GradeOption from '../../atomics/SelectOptions/GradeOption';
import TimesOption from '../../atomics/SelectOptions/TimesOption';
import useToken from '../../hooks/useToken';
import ProblemApi from '../../api/Problem';
import ProblemEditor from '../ProblemEditor';
import SmallButton from '../../atomics/SmallButton';
import SmallInput from '../../atomics/SmallInput';
import SmallSelect from '../../atomics/SmallSelect';
import DynamicSubject from '../../utils/DynamicSubject';
import { useProfile } from '../../hooks/useProfile';
import ErrorCode from '../../error/ErrorCode';

const SmallButtonStyle = styled(SmallButton)`
    margin-top: 10px;
`;

const SmallSelectStyle = styled(SmallSelect)`
    width: 100px;
`;

interface UpdateEditorProps {
    readonly id: string;
}

const UpdateEditor: React.FC<RouteComponentProps & UpdateEditorProps> = ({ id, history }) => {
    const refreshToken = useToken();
    const profile = useProfile();

    const editorRef = useRef<Editor>();

    const [answer, setAnswer] = useState('');
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    const [times, setTimes] = useState('');

    useEffect(() => {
        ProblemApi.get(id)
            .then((res) => {
                if (editorRef.current === undefined) return;

                // eslint-disable-next-line no-shadow
                const { contents, answer, subject, grade, times } = res.data.data;

                setAnswer(answer);
                setSubject(subject);
                setGrade(grade);
                setTimes(times);

                editorRef.current.getInstance().setHtml(contents);
            })
            .catch((err) => {
                const { code } = err.response.data;
                if (code === ErrorCode.JWT_EXPIRED) {
                    refreshToken();
                }
            });
    }, [id, refreshToken]);

    const updateProblem = () => {
        if (!editorRef.current) return;
        if (!profile) return;

        if (answer === '' || subject === '' || grade === '' || times === '') {
            cogoToast.warn('빈 칸이 있습니다.');
            return;
        }

        const html = editorRef.current.getInstance().getHtml();
        const problemData = {
            email: profile!!.data!!.email,
            contents: html,
            answer,
            subject,
            grade,
            times
        };

        ProblemApi.update(id, problemData)
            .then(() => {
                cogoToast.success('문제 수정 완료!');
                history.goBack();
            })
            .catch((err) => {
                const { code } = err.response.data;

                if (code === ErrorCode.USER_NOT_MATCH) {
                    cogoToast.warn('자신이 출제한 문제만 수정할 수 있습니다.');
                }
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
