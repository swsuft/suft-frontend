import axios from 'axios';
import config from '../config';

const uploadImageCallback = (file: any): Promise<object> => {
    return new Promise((resolve, reject) => {
        const data = new FormData();
        data.append('image', file);
        axios
            .post(`${config.ENDPOINT}/image`, data, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                const url = res.data;
                resolve({ url });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default uploadImageCallback;
