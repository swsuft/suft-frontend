import React from 'react';
import FontedTitle from '../../atomics/Typography/FontedTitle';
import MyProblemLayout from '../../layouts/MyProblemLayout';

const MyProblemView: React.FC = () => {
    return (
        <MyProblemLayout>
            <FontedTitle>문제 관리</FontedTitle>
        </MyProblemLayout>
    );
};

export default MyProblemView;
