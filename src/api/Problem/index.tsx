import { AxiosResponse } from 'axios';
import Api from '../index';
import { DefaultErrorHandler } from '../errorHandler';

type Response = Promise<AxiosResponse>;

interface Problem {
    readonly contents: string;
    readonly answer: string;
    readonly author: string;
    readonly subject: string;
    readonly grade: string;
    readonly times: string;
}

interface ProblemApi {
    readonly all: () => Response;
    readonly get: (id: string) => Response;
    readonly filter: (subject: string, grade: string, times: string) => Response;
    readonly create: (problem: Problem) => Response;
    readonly update: (id: string, problem: Problem) => Response;
    readonly delete: (id: string) => Response;
}

const ProblemApi: ProblemApi = {
    all() {
        return new Promise((resolve, reject) => {
            Api.get('/problem/all')
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    get(id: string) {
        return new Promise((resolve, reject) => {
            Api.get(`/problem/${id}`)
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    filter(subject: string, grade: string, times: string) {
        return new Promise((resolve, reject) => {
            Api.get(`/problem/${subject}/${grade}/${times}`)
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    create(problem: Problem) {
        return new Promise((resolve, reject) => {
            Api.post('/problem', problem)
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    update(id: string, problem: Problem) {
        return new Promise((resolve, reject) => {
            Api.put(`/problem/${id}`, problem)
                .then((res) => {
                    return resolve(res);
                })
                .catch((e) => {
                    DefaultErrorHandler(e);
                    return reject(e);
                });
        });
    },
    delete(id: string) {
        return new Promise((resolve, reject) => {
            Api.delete(`/problem/${id}`)
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

export default ProblemApi;
