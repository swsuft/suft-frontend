import { AxiosResponse } from 'axios';
import Api from '../index';
import { DefaultErrorHandler } from '../errorHandler';

type Response = Promise<AxiosResponse>;

interface AuthApi {
    readonly register: (email: string, password: string, name: string, grade: string) => Response;
    readonly login: (email: string, password: string) => Response;
    readonly logout: () => Response;
    readonly profile: () => Response;
    readonly token: () => Response;
}

const AuthApi: AuthApi = {
    register(email: string, password: string, name: string, grade: string) {
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
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            Api.post('/login', {
                email,
                password
            })
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    logout() {
        return new Promise((resolve, reject) => {
            Api.post('/logout')
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    profile() {
        return new Promise((resolve, reject) => {
            Api.get('/profile')
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    token() {
        return new Promise((resolve, reject) => {
            Api.post('/token')
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    }
};

export default AuthApi;
