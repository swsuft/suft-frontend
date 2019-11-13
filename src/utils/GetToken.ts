import axios from 'axios';
import config from '../constants/config';

const GetToken = () => {
    axios
        .post(`${config.ENDPOINT}/token`, {}, { withCredentials: true })
        .then((data) => {
            if (!data.data.success) {
                alert(data.data.message);
            } else {
                console.log('AccessToken 재발급 완료');
                localStorage.setItem('token', data.data.token);
                window.location.reload();
            }
        })
        .catch((err) => {
            alert(err);
        });
};

export default GetToken;
