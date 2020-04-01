import { useCallback } from 'react';
import Token from '../api/Token';
import AuthApi from '../api/Auth';

const useToken = () => {
    const refreshToken = useCallback(() => {
        if (Token.isEmpty()) {
            return;
        }

        AuthApi.token().then((res) => {
            Token.set(res.data.token);
            window.location.reload();
            console.log('AccessToken 재발급 완료');
        });
    }, []);

    return refreshToken;
};

export default useToken;
