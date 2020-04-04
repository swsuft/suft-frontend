import React from 'react';
import DayTag from './index';

export default {
    title: 'Atomics',
    component: DayTag
};

export const DayTagStory = () => {
    return <DayTag>30일</DayTag>;
};

DayTagStory.story = {
    name: 'DayTag'
};
