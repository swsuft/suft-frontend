import { AxiosError } from 'axios';
import Error from '../error/Error';
import serverErrorHandler from '../utils/ServerErrorHandler';

export const AuthErrorHandler = (err: AxiosError) => {
    const { code, message } = err.response!.data;

    if (code === Error.JWT_EXPIRED) {
        return;
    }

    if (code === Error.JWT_INVALID) {
        return;
    }

    if (code === Error.REFRESH_EXPIRED) {
        return;
    }

    if (code === Error.SERVER_ERROR) {
        serverErrorHandler(err);
        return;
    }

    console.log(`ERROR ${code} ${message}`);
};
