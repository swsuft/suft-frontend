import React, { createContext, useContext, useEffect, useState } from 'react';
import MealApi from '../api/Meal';

const context = createContext<string[]>([]);
const DEFAULT_TEXT = '🍚 밥을 짓는 중...';

export const MealProvider: React.FC = ({ children }) => {
    const [meal, setMeal] = useState<string[]>([DEFAULT_TEXT, DEFAULT_TEXT]);

    useEffect(() => {
        MealApi.meal().then((res) => {
            const { today, tomorrow } = res.data.data;
            setMeal([today, tomorrow]);
        });
    }, []);

    return <context.Provider value={meal}>{children}</context.Provider>;
};

export const useMeal = () => useContext(context);
