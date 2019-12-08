import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../constants/config';

const context = createContext<string[]>([]);

export const MealProvider: React.FC = ({ children }) => {
    const [meal, setMeal] = useState<string[]>(['불러오는 중', '불러오는 중']);

    useEffect(() => {
        axios
            .get(`${config.ENDPOINT}/meal`)
            .then((raw: any) => {
                setMeal([raw.data.today, raw.data.tomorrow]);
            })
            .catch((err: any) => {
                alert(err);
            });
    }, []);

    return <context.Provider value={meal}>{children}</context.Provider>;
};

export const useMeal = () => useContext(context);
