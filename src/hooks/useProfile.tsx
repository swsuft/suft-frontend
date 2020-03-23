import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import useToken from './useToken';
import Error from '../error/Error';

interface Profile {
    readonly email: string;
    readonly name: string;
    readonly grade: string;
    readonly isAdmin: boolean;
    readonly isBlocked: boolean;
    readonly root: boolean;
}

interface ProfileResponse {
    readonly success: boolean;
    readonly data: Profile | undefined;
}

const context = createContext<ProfileResponse>({ success: false } as ProfileResponse);

export const ProfileProvider: React.FC = ({ children }) => {
    const [profile, setProfile] = useState<ProfileResponse>({ success: false } as ProfileResponse);
    const refreshToken = useToken();

    useEffect(() => {
        axios
            .get(`${config.ENDPOINT}/profile`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                if (!res.data.success) {
                    const msg = res.data.message;
                    if (msg === 'jwt expired') {
                        refreshToken();
                    }
                }

                setProfile(res.data);
            })
            .catch((error) => {
                const errorCode = error.response.data.code;
                setProfile({
                    success: false,
                    data: undefined
                });

                if (errorCode === Error.SERVER_ERROR) {
                    alert('서버 오류가 발생하였습니다. 잠시후 다시 시도해주세요.\n문제가 지속될 경우 관리자에게 알려주세요.');
                    console.log(`유저 정보 오류: ${error}`);
                }
            });
    }, [refreshToken]);

    return <context.Provider value={profile}>{children}</context.Provider>;
};

export const useProfile = () => useContext(context);
