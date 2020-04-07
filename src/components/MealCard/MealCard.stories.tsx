import React from 'react';
import MealCard from './index';

export default {
    title: 'Components',
    component: MealCard
};

export const MealCardStory = () => {
    return <MealCard />;
};

MealCardStory.story = {
    name: 'MealCard'
};
