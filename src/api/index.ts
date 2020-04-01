import axios, { AxiosInstance } from 'axios';
import config from '../config';
import Token from './Token';

const getAxiosInstance = (): AxiosInstance => {
    return axios.create({
        baseURL: config.API_URL,
        headers: {
            Authorization: `Bearer ${Token.get()}`
        },
        withCredentials: true
    });
};

const Api = getAxiosInstance();

export default Api;
