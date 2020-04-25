import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import Card from './index';

export default {
    title: 'Components',
    component: Card,
    decorators: [withKnobs]
};

export const CardStory = () => {
    const pcWidth = text('pcWidth', 'calc(50% - 3rem)');
    const pcHeight = text('pcHeight', '10rem');
    const mobileWidth = text('mobileWidth', '18rem');
    const mobileHeight = text('mobileHeight', '8rem');
    const isClick = boolean('isClick', false);
    const inline = boolean('inline', false);

    return (
        <Card
          pcWidth={pcWidth}
          pcHeight={pcHeight}
          mobileWidth={mobileWidth}
          mobileHeight={mobileHeight}
          isClick={isClick}
          inline={inline}
        >
            <p>내용</p>
        </Card>
    );
};

CardStory.story = {
    name: 'Card'
};
