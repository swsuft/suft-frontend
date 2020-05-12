import React, { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import FontedTitle from '../../atomics/Typography/FontedTitle';
import ProblemEditor from '../../components/ProblemEditor';
import MyProblemLayout from '../../layouts/MyProblemLayout';

const MyProblemCreate: React.FC = () => {
    const editorRef = useRef<Editor>();

    return (
        <MyProblemLayout>
            <FontedTitle>문제 등록</FontedTitle>
            <ProblemEditor editorRef={editorRef} />
        </MyProblemLayout>
    );
};

export default MyProblemCreate;
