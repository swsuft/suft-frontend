import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import config from '../config';

interface TokenContext {
    readonly refreshToken: () => void;
}

const context = createContext<TokenContext>({} as TokenContext);

export const TokenProvider: React.FC = ({ children }) => {
    const [flag, setFlag] = useState<boolean>(false);

    const manager: TokenContext = {
        refreshToken() {
            if (localStorage.getItem('token') === null) {
                return;
            }

            axios
                .post(`${config.ENDPOINT}/token`, {}, { withCredentials: true })
                .then((data) => {
                    if (!data.data.success) {
                        if (data.data.message === '재발급 토큰이 만료되었습니다.') {
                            return;
                        }

                        alert(data.data.message);
                    } else {
                        console.log('AccessToken 재발급 완료');
                        localStorage.setItem('token', data.data.token);
                        setFlag(!flag);
                    }
                })
                .catch((err) => {
                    alert('서버 오류가 발생하였습니다. 잠시후 다시 시도해주세요.\n문제가 지속될 경우 관리자에게 알려주세요.');
                    console.log(`토큰 연장 오류: ${err}`);
                });
        }
    };

    return <context.Provider value={manager}>{children}</context.Provider>;
};

export const useToken = () => useContext(context);
