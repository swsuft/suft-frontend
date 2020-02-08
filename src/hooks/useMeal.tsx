import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

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
            .then((raw: any) => {
                setMeal([raw.data.today, raw.data.tomorrow]);
            })
            .catch((err: any) => {
                alert('서버 오류가 발생하였습니다. 잠시후 다시 시도해주세요.\n문제가 지속될 경우 관리자에게 알려주세요.');
                console.log(`급식 정보 오류: ${err}`);
            });
    }, []);

    return <context.Provider value={meal}>{children}</context.Provider>;
};

export const useMeal = () => useContext(context);
