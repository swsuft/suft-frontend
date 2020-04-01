import Api from '../api';

const uploadImageCallback = (file: any): Promise<object> => {
    return new Promise((resolve, reject) => {
        const data = new FormData();
        data.append('image', file);
        Api.post('/image', data)
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
