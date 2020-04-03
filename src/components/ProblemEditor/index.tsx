import React, { MutableRefObject, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// eslint-disable-next-line import/no-extraneous-dependencies
import hljs from 'highlight.js';
import cogoToast from 'cogo-toast';
import Api from '../../api';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'highlight.js/styles/github.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'codemirror/lib/codemirror.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tui-color-picker/dist/tui-color-picker.css';

interface ProblemEditorProps {
    readonly editorRef: MutableRefObject<Editor | undefined>;
    readonly initialValue?: string;
}

const ProblemEditor: React.FC<ProblemEditorProps> = ({ editorRef, initialValue }) => {
    useEffect(() => {
        if (editorRef.current === undefined) return;

        editorRef.current.getInstance().addHook('addImageBlobHook', (blob, callback) => {
            const data = new FormData();
            data.append('image', blob);
            Api.post('/image', data)
                .then((res) => {
                    const url = res.data.data;
                    callback(url);
                })
                .catch((err) => {
                    cogoToast.error('이미지 업로드 중 오류가 발생하였습니다.');
                    console.log('ERROR', err);
                });
        });
    }, [editorRef]);

    // @ts-ignore `ref` prop을 인식하지 못하는 오류 해결용
    return <Editor previewStyle="vertical" height="600px" initialEditType="wysiwyg" initialValue={initialValue} plugins={[colorSyntax, [codeSyntaxHightlight, { hljs }]]} ref={editorRef} />;
};

export default ProblemEditor;
