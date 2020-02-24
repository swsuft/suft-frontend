import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
// @ts-ignore
import draftToHtml from 'draftjs-to-html';
// @ts-ignore
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import config from '../../config';
import SubjectOption from '../../atomics/SelectOptions/SubjectOption/SubjectOption';
import GradeOption from '../../atomics/SelectOptions/GradeOption';
import TimesOption from '../../atomics/SelectOptions/TimesOption';
import uploadImageCallback from '../../utils/UploadImage';
import ProblemPreview from './ProblemPreview';
import useToken from '../../hooks/useToken';

const EditorStyle = styled.div`
    background: #ffffff;

    .draft-editor {
        min-height: 200px;
    }
`;

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

interface UpdateEditorProps {
    readonly id: string;
}

const UpdateEditor: React.FC<RouteComponentProps & UpdateEditorProps> = ({ id, history }) => {
    const refreshToken = useToken();
    const [editor, setEditor] = useState(EditorState.createEmpty());
    const [answer, setAnswer] = useState('');
    const [author, setAuthor] = useState('');
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    const [times, setTimes] = useState('');

    useEffect(() => {
        axios
            .get(`${config.ENDPOINT}/problem/${id}`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                if (!res.data.success) {
                    alert(res.data.message);
                } else {
                    // eslint-disable-next-line
                    const { author, contents, answer, subject, grade, times } = res.data.problem;

                    const blocksFromHtml = htmlToDraft(contents);
                    const { contentBlocks, entityMap } = blocksFromHtml;
                    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                    const editorState = EditorState.createWithContent(contentState);

                    setAuthor(author);
                    setEditor(editorState);
                    setAnswer(answer);
                    setSubject(subject);
                    setGrade(grade);
                    setTimes(times);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const updateProblem = () => {
        if (answer === '' || subject === '' || grade === '' || times === '') {
            alert('빈 칸이 있습니다.');
            return;
        }

        const html = draftToHtml(convertToRaw(editor.getCurrentContent()));

        axios
            .put(
                `${config.ENDPOINT}/problem/${id}`,
                {
                    author: author !== '' ? author : '익명',
                    contents: html,
                    answer,
                    subject,
                    grade,
                    times
                },
                {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`
                    }
                }
            )
            .then((res) => {
                if (!res.data.success) {
                    alert(res.data.message);
                } else {
                    alert('문제 수정 완료!');
                    history.push('/admin');
                    refreshToken();
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <>
            <EditorStyle>
                <Editor
                  editorState={editor}
                  toolbarClassName="draft-toolbar"
                  wrapperClassName="draft-wrapper"
                  editorClassName="draft-editor"
                  onEditorStateChange={(editorState: any) => setEditor(editorState)}
                  localization={{ locale: 'ko' }}
                  toolbar={{
                        image: {
                            uploadCallback: uploadImageCallback,
                            alt: { present: true }
                        }
                    }}
                />
            </EditorStyle>

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

            <ButtonStyle onClick={updateProblem}>수정 완료</ButtonStyle>

            <ProblemPreview html={draftToHtml(convertToRaw(editor.getCurrentContent()))} />
        </>
    );
};

export default withRouter(UpdateEditor);
