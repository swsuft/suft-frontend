import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import SmallInput from './index';

export default {
    title: 'Atomics',
    component: SmallInput,
    decorators: [withKnobs]
};

export const SmallInputStory = () => {
    const value = text('input value', '');

    return <SmallInput value={value} />;
};

SmallInputStory.story = {
    name: 'SmallInput'
};
