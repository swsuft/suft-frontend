import { AxiosResponse } from 'axios';
import Api from '../index';
import { DefaultErrorHandler } from '../errorHandler';

type Response = Promise<AxiosResponse>;

interface UserApi {
    readonly all: () => Response;
    readonly block: (email: string) => Response;
    readonly unblock: (email: string) => Response;
    readonly update: (email: string, nowPassword: string, newPassword: string | undefined, grade: string) => Response;
}

const UserApi: UserApi = {
    all() {
        return new Promise((resolve, reject) => {
            Api.get('/user/all')
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    block(email: string) {
        return new Promise((resolve, reject) => {
            Api.put(`/user/block/${email}`)
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    unblock(email: string) {
        return new Promise((resolve, reject) => {
            Api.put(`/user/unblock/${email}`)
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    update(email: string, nowPassword: string, newPassword: string | undefined, grade: string) {
        return new Promise((resolve, reject) => {
            Api.put(`/user/${email}`, {
                nowPassword,
                newPassword,
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
    }
};

export default UserApi;
