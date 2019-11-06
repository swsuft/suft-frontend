import React from 'react';
import styled from 'styled-components';
import { useMeal } from '../../hooks/useMeal';

const MealTitle = styled.p`
    font-size: 30px;
    font-family: 'Godo', sans-serif;
`;

const MealText = styled.pre`
    font-size: 16px;
    font-family: 'Noto Sans KR', sans-serif;
`;

const Meal: React.FC = () => {
    const meal = useMeal();

    return (
        <>
            <MealTitle>오늘 급식</MealTitle>

            <MealText>{meal[0]}</MealText>

            <br />

            <MealTitle>내일 급식</MealTitle>

            <MealText>{meal[1]}</MealText>
        </>
    );
};

export default Meal;
