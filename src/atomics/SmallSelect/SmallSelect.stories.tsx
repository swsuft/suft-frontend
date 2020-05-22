import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import SmallSelect from './index';
import GradeOption from '../SelectOptions/GradeOption';

export default {
    title: 'Atomics',
    component: SmallSelect,
    decorators: [withKnobs]
};

export const SmallSelectStory = () => {
    const value = text('select value', '');

    return (
        <SmallSelect value={value}>
            <GradeOption />
        </SmallSelect>
    );
};

SmallSelectStory.story = {
    name: 'SmallSelect (with GradeOption)'
};
