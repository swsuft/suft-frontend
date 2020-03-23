import { useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import config from '../config';
import Error from '../error/Error';
import serverErrorHandler from '../utils/ServerErrorHandler';

const useToken = () => {
    const refreshToken = useCallback(() => {
        if (localStorage.getItem('token') === null) {
            return;
        }

        axios
            .post(`${config.ENDPOINT}/token`, {}, { withCredentials: true })
            .then((data: AxiosResponse) => {
                localStorage.setItem('token', data.data.token);
                window.location.reload();
                console.log('AccessToken 재발급 완료');
            })
            .catch((err) => {
                const errorCode = err.response.data.code;

                if (errorCode === Error.REFRESH_EXPIRED) {
                    return;
                }

                if (errorCode === Error.SERVER_ERROR) {
                    serverErrorHandler(err);
                    return;
                }

                alert(err.response.data.message);
            });
    }, []);

    return refreshToken;
};

export default useToken;
