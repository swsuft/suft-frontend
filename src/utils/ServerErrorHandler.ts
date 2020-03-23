const serverErrorHandler = (error: Error) => {
    alert('서버 오류가 발생하였습니다. 잠시후 다시 시도해주세요.\n문제가 지속될 경우 관리자에게 알려주세요.');
    console.log(`오류: ${error}`);
};

export default serverErrorHandler;
