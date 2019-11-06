import React from 'react';

const TimesOption: React.FC = () => {
    return (
        <>
            <option value="1-1">1학기 1차</option>
            <option value="1-2">1학기 2차</option>
            <option value="2-1">2학기 1차</option>
            <option value="2-2">2학기 2차</option>
            <option value="4">기타</option>
        </>
    );
};

export default TimesOption;
