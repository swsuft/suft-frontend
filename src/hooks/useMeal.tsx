import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import cogoToast from 'cogo-toast';

const context = createContext<string[]>([]);
const DEFAULT_TEXT = '🍚 밥을 짓는 중...';

const GET_MEAL = gql`
    query {
        meal {
            today
            tomorrow
        }
    }
`;

export const MealProvider: React.FC = ({ children }) => {
    const [meal, setMeal] = useState<string[]>([DEFAULT_TEXT, DEFAULT_TEXT]);
    const { loading, error, data } = useQuery(GET_MEAL);

    useEffect(() => {
        if (loading) {
            setMeal([DEFAULT_TEXT, DEFAULT_TEXT]);
            return;
        }
        if (error) {
            cogoToast.error('현재 급식을 불러올 수 없어요.');
            return;
        }

        setMeal([data.meal.today, data.meal.tomorrow]);
    }, [loading, error, data]);

    return <context.Provider value={meal}>{children}</context.Provider>;
};

export const useMeal = () => useContext(context);
