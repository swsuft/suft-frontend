import { AxiosResponse } from 'axios';
import Api from '../index';
import { DefaultErrorHandler } from '../errorHandler';

type Response = Promise<AxiosResponse>;

interface WaitingApi {
    readonly all: () => Response;
    readonly blacklist: () => Response;
    readonly allow: (email: string) => Response;
    readonly deny: (email: string) => Response;
}

const WaitingApi: WaitingApi = {
    all() {
        return new Promise((resolve, reject) => {
            Api.get('/waiting/all')
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    blacklist() {
        return new Promise((resolve, reject) => {
            Api.get('/waiting/blacklist')
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    allow(email: string) {
        return new Promise((resolve, reject) => {
            Api.put(`/waiting/allow/${email}`)
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    deny(email: string) {
        return new Promise((resolve, reject) => {
            Api.put(`/waiting/deny/${email}`)
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

export default WaitingApi;
