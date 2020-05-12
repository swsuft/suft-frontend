import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import Select from './index';
import GradeOption from '../SelectOptions/GradeOption';

export default {
    title: 'Atomics',
    component: Select,
    decorators: [withKnobs]
};

export const SelectStory = () => {
    const value = text('select value', '');
    const width = text('width', '');
    const height = text('height', '');

    return (
        <Select value={value} width={width} height={height}>
            <GradeOption />
        </Select>
    );
};

SelectStory.story = {
    name: 'Select (with GradeOption)'
};
