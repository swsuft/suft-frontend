import { useCallback } from 'react';
import TokenUtil from '../api/TokenUtil';
import AuthApi from '../api/Auth';

const useToken = () => {
    const refreshToken = useCallback(() => {
        if (TokenUtil.isEmpty()) {
            return;
        }

        AuthApi.token().then((res) => {
            TokenUtil.set(res.data.token);
            window.location.reload();
            console.log('AccessToken 재발급 완료');
        });
    }, []);

    return refreshToken;
};

export default useToken;
