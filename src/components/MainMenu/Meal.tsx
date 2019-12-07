import React from 'react';
import { useMeal } from '../../hooks/useMeal';
import MealTitle from '../../atoms/MainMenu/MealText/MealTitle';
import MealText from '../../atoms/MainMenu/MealText';
import MealTomorrowTitle from '../../atoms/MainMenu/MealText/MealTomorrowTitle';

const Meal: React.FC = () => {
    const meal = useMeal();

    return (
        <div>
            <div>
                <MealTitle>오늘 급식</MealTitle>

                <MealText>{meal[0]}</MealText>
            </div>

            <br/>

            <div>
                <MealTomorrowTitle>내일 급식</MealTomorrowTitle>

                <MealText>{meal[1]}</MealText>
            </div>
        </div>
    );
};

export default Meal;
