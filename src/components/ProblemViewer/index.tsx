import React, { MutableRefObject } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import 'highlight.js/styles/github.css';
import styled from 'styled-components';

// eslint-disable import/no-extraneous-dependencies

interface ProblemEditorProps {
    readonly viewerRef: MutableRefObject<Viewer | null>;
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
            <Viewer plugins={[]} initialValue={initialValue} ref={viewerRef} />
        </Wrapper>
    );
};

export default ProblemViewer;
