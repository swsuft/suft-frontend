enum ErrorMessage {
    SERVER_ERROR = '문제가 발생하였습니다. 관리자에게 문의하세요.',
    USER_NOT_FOUND = '사용자가 존재하지 않거나 비밀번호가 올바르지 않습니다.',
    USER_ALREADY_EXISTS = '사용자가 이미 존재합니다.',
    USER_BLOCK = '서비스 이용이 차단된 사용자입니다.',
    BLOCK_EMAIL = '가입 불가능한 이메일입니다.',
    JWT_EXPIRED = '토큰이 만료되었습니다.',
    REFRESH_EXPIRED = '재발급 토큰이 만료되었습니다.',
    JWT_INVALID = '토큰이 올바르지 않습니다.',
    PW_NOT_MATCH = '현재 비밀번호가 올바르지 않습니다.',
    USER_NOT_MATCH = '자기 자신만 접근할 수 있습니다.',
    USER_WAITING = '가입 대기 중입니다.',
    USER_DENY = '가입 거절된 사용자입니다.',
    NO_PERMISSION = '권한이 없습니다.',
    PROBLEM_NOT_FOUND = '문제가 존재하지 않습니다.'
}

export default ErrorMessage;
