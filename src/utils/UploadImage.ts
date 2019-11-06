import axios from 'axios';
import config from '../config/main';

const uploadImageCallback = (file: any): Promise<object> => {
    return new Promise((resolve, reject) => {
        const data = new FormData();
        data.append('image', file);
        axios
            .post(`${config.endpoint}/image`, data, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then((res: any) => {
                resolve(res.data);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

export default uploadImageCallback;
