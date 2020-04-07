import React, { createContext, useContext, useEffect, useState } from 'react';
import MealApi from '../api/Meal';

const context = createContext<string[]>([]);
const DEFAULT_TEXT = '🍚 밥을 짓는 중...';

const UPDATE_DATE = 'update_date';
const MEAL_DATA = 'meal_data';

export const MealProvider: React.FC = ({ children }) => {
    const [meal, setMeal] = useState<string[]>([DEFAULT_TEXT, DEFAULT_TEXT]);
    const updateDate = localStorage.getItem(UPDATE_DATE);
    const mealData = localStorage.getItem(MEAL_DATA);

    useEffect(() => {
        const date = new Date().toDateString();

        if (!mealData || !updateDate || updateDate !== date) {
            MealApi.meal().then((res) => {
                localStorage.setItem(UPDATE_DATE, date);
                localStorage.setItem(MEAL_DATA, JSON.stringify(res.data.data));
                window.location.reload();
            });
        }

        const { today, tomorrow } = JSON.parse(mealData!);
        setMeal([today, tomorrow]);
    }, []);

    return <context.Provider value={meal}>{children}</context.Provider>;
};

export const useMeal = () => useContext(context);
