import React from 'react';
import {
    EtcSubjectOption,
    FirstSubjectOption,
    SecondSubjectOption,
    ThirdSubjectOption
} from '../atomics/SelectOptions/SubjectOption/SubjectOption';

interface DynamicSubjectProps {
    readonly current: string;
}

const DynamicSubject: React.FC<DynamicSubjectProps> = ({ current }) => {
    let CurrentSubject: JSX.Element;

    switch (current) {
        case '1':
            CurrentSubject = (
                <>
                    <option value="">1학년 과목</option>
                    <FirstSubjectOption />
                </>
            );
            break;
        case '2':
            CurrentSubject = (
                <>
                    <option value="">2학년 과목</option>
                    <SecondSubjectOption />
                </>
            );
            break;
        case '3':
            CurrentSubject = (
                <>
                    <option value="">3학년 과목</option>
                    <ThirdSubjectOption />
                </>
            );
            break;
        case '4':
            CurrentSubject = (
                <>
                    <option value="">기타 과목</option>
                    <EtcSubjectOption />
                </>
            );
            break;
        default:
            CurrentSubject = <option value="">학년을 먼저 선택해주세요.</option>;
    }

    return <>{CurrentSubject}</>;
};

export default DynamicSubject;
