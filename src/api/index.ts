import axios, { AxiosInstance } from 'axios';
import config from '../config';
import TokenUtil from './TokenUtil';

const getAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: config.API_URL,
        withCredentials: true
    });

    if (!TokenUtil.isEmpty) {
        instance.defaults.headers.common.Authorization = `Bearer ${TokenUtil.get()}`;
    }

    return instance;
};

const Api = getAxiosInstance();

export default Api;
