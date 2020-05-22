import React from 'react';
import CbtNumberButton from './index';

export default {
    title: 'Atomics',
    component: CbtNumberButton
};

export const CbtNumberButtonStory = () => {
    return <CbtNumberButton>1번</CbtNumberButton>;
};

CbtNumberButtonStory.story = {
    name: 'CbtNumberButton'
};
