import { useState } from 'react';

const useDay = () => {
    const [today, setToday] = useState<number>(0);
    const [tomorrow, setTomorrow] = useState<number>(0);

    const todayDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    setToday(todayDate.getDate());
    setTomorrow(tomorrowDate.getDate());

    return [today, tomorrow];
};

export default useDay;
