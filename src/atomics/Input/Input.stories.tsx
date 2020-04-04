import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import Input from './index';

export default {
    title: 'Atomics',
    component: Input,
    decorators: [withKnobs]
};

export const InputStory = () => {
    const value = text('input value', '');
    const width = text('width', '');
    const height = text('height', '');
    const disabled = boolean('disabled', false);

    return <Input value={value} width={width} height={height} disabled={disabled} />;
};

InputStory.story = {
    name: 'Input'
};
