import React from 'react';

export const FirstSubjectOption: React.FC = () => {
    return (
        <>
            <option value="1">국어</option>
            <option value="2">수학</option>
            <option value="3">사회</option>
            <option value="4">과학</option>
            <option value="5">영어</option>
            <option value="6">정보처리와 관리</option>
            <option value="7">프로그래밍</option>
            <option value="8">컴퓨터 구조</option>
        </>
    );
};

export const SecondSubjectOption: React.FC = () => {
    return (
        <>
            <option value="1">국어</option>
            <option value="2">수학</option>
            <option value="4">과학</option>
            <option value="9">한국사</option>
            <option value="10">영어회화</option>
            <option value="11">일본어</option>
            <option value="12">응용프로그래밍 화면구현</option>
            <option value="13">컴퓨터 네트워크</option>
            <option value="14">자료 구조</option>
        </>
    );
};

export const ThirdSubjectOption: React.FC = () => {
    return (
        <>
            <option value="12">응용프로그래밍 화면구현</option>
            <option value="15">응용프로그래밍 개발</option>
            <option value="16">데이터베이스 프로그래밍</option>
            <option value="17">시스템 프로그래밍</option>
        </>
    );
};

export const EtcSubjectOption: React.FC = () => {
    return (
        <>
            <option value="999">자격증</option>
        </>
    );
};
