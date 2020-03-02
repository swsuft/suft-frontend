const subjectToString = (id: string): string => {
    if (id === '1') {
        return '국어';
    }
    if (id === '2') {
        return '수학';
    }
    if (id === '3') {
        return '사회';
    }
    if (id === '4') {
        return '과학';
    }
    if (id === '5') {
        return '영어';
    }
    if (id === '6') {
        return '정보처리와 관리';
    }
    if (id === '7') {
        return '프로그래밍';
    }
    if (id === '8') {
        return '컴퓨터구조';
    }
    if (id === '999') {
        return '자격증';
    }

    return 'ERROR';
};

export default subjectToString;
