import React, { MutableRefObject } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import styled from 'styled-components';

// eslint-disable import/no-extraneous-dependencies

interface ProblemEditorProps {
    readonly viewerRef: MutableRefObject<Viewer | undefined>;
    readonly initialValue?: string;
}

const Wrapper = styled.div`
    .tui-editor-contents {
        font-size: 1.1rem;
    }
`;

const ProblemViewer: React.FC<ProblemEditorProps> = ({ viewerRef, initialValue }) => {
    // @ts-ignore `ref` prop을 인식하지 못하는 오류 해결용
    return (
        <Wrapper>
            <Viewer plugins={[[codeSyntaxHightlight, { hljs }]]} initialValue={initialValue} ref={viewerRef} />
        </Wrapper>
    );
};

export default ProblemViewer;
