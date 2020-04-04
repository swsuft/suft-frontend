import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import CbtAnswer from './index';

export default {
    title: 'Components',
    component: CbtAnswer,
    decorators: [withKnobs]
};

export const CbtAnswerStory = () => {
    const answerValue = text('input value', '');

    return <CbtAnswer answerValue={answerValue} />;
};

CbtAnswerStory.story = {
    name: 'CbtAnswer'
};
