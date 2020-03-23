import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import Error from '../error/Error';
import serverErrorHandler from '../utils/ServerErrorHandler';

const context = createContext<string[]>([]);

export const MealProvider: React.FC = ({ children }) => {
    const [meal, setMeal] = useState<string[]>(['불러오는 중', '불러오는 중']);

    useEffect(() => {
        axios
            .get(`${config.ENDPOINT}/meal`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                const { today, tomorrow } = res.data.data;
                setMeal([today, tomorrow]);
            })
            .catch((err) => {
                const errorCode = err.response.data.code;

                if (errorCode === Error.JWT_INVALID) {
                    return;
                }

                if (errorCode === Error.SERVER_ERROR) {
                    serverErrorHandler(err);
                    return;
                }

                alert(err.response.data.message);
            });
    }, []);

    return <context.Provider value={meal}>{children}</context.Provider>;
};

export const useMeal = () => useContext(context);
