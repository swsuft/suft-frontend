import React, { MutableRefObject } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// eslint-disable-next-line import/no-extraneous-dependencies
import hljs from 'highlight.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'highlight.js/styles/github.css';

interface ProblemEditorProps {
    readonly viewerRef: MutableRefObject<Viewer | undefined>;
    readonly initialValue?: string;
}

const ProblemViewer: React.FC<ProblemEditorProps> = ({ viewerRef, initialValue }) => {
    // @ts-ignore `ref` prop을 인식하지 못하는 오류 해결용
    return <Viewer plugins={[[codeSyntaxHightlight, { hljs }]]} initialValue={initialValue} ref={viewerRef} />;
};

export default ProblemViewer;
