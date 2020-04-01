import { AxiosResponse } from 'axios';
import Api from '../index';
import { DefaultErrorHandler } from '../errorHandler';

type Response = Promise<AxiosResponse>;

interface MealApi {
    readonly meal: () => Response;
}

const MealApi: MealApi = {
    meal() {
        return new Promise((resolve, reject) => {
            Api.get('/meal')
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

export default MealApi;
