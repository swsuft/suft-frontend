const subjectToString = (id: string): string => {
    switch (id) {
        case '1':
            return '국어';
        case '2':
            return '수학';
        case '3':
            return '사회';
        case '4':
            return '과학';
        case '5':
            return '영어';
        case '6':
            return '정보처리와 관리';
        case '7':
            return '프로그래밍';
        case '8':
            return '컴퓨터구조';
        case '9':
            return '한국사';
        case '10':
            return '영어회화';
        case '11':
            return '일본어';
        case '12':
            return '응용프로그래밍 화면구현';
        case '13':
            return '컴퓨터 네트워크';
        case '14':
            return '자료 구조';
        case '15':
            return '응용프로그래밍 개발';
        case '16':
            return '데이터베이스 프로그래밍';
        case '17':
            return '시스템 프로그래밍';
        case '999':
            return '자격증';
        default:
            return '알수없는 과목';
    }
};

export default subjectToString;
