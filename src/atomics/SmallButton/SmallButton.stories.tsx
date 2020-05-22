import React from 'react';
import SmallButton from './index';

export default {
    title: 'Atomics',
    component: SmallButton
};

export const SmallButtonStory = () => {
    return <SmallButton background="var(--color-blue)">내용</SmallButton>;
};

SmallButtonStory.story = {
    name: 'SmallButton'
};
