import { AxiosResponse } from 'axios';
import Api from '../index';
import { AuthErrorHandler } from '../errorHandler';

interface AuthApi {
    register: (email: string, password: string, name: string, grade: string) => Promise<AxiosResponse>;
}

const AuthApi: AuthApi = {
    register(email, password, name, grade) {
        return new Promise((resolve, reject) => {
            Api.post('/register', {
                email,
                password,
                name,
                grade
            })
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    AuthErrorHandler(e);
                    return reject(e);
                });
        });
    }
};

export default AuthApi;
