import React from 'react';
import { useMeal } from '../../hooks/useMeal';
import MealTitle from '../../atoms/MainMenu/MealText/MealTitle';
import MealText from '../../atoms/MainMenu/MealText';

const Meal: React.FC = () => {
    const meal = useMeal();

    return (
        <div>
            <MealTitle>오늘 급식</MealTitle>

            <MealText>{meal[0]}</MealText>

            <br/>

            <MealTitle>내일 급식</MealTitle>

            <MealText>{meal[1]}</MealText>
        </div>
    );
};

export default Meal;
