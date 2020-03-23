import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import useToken from './useToken';
import Error from '../error/Error';
import serverErrorHandler from '../utils/ServerErrorHandler';

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
                setProfile(res.data);
            })
            .catch((error) => {
                const errorCode = error.response.data.code;
                setProfile({
                    success: false,
                    data: undefined
                });

                if (errorCode === Error.JWT_EXPIRED) {
                    refreshToken();
                    return;
                }

                if (errorCode === Error.JWT_INVALID) {
                    return;
                }

                if (errorCode === Error.SERVER_ERROR) {
                    serverErrorHandler(error);
                    return;
                }

                console.log('test', error.response.data.code, error.response.data.message);

                alert(error.response.data.message);
            });
    }, [refreshToken]);

    return <context.Provider value={profile}>{children}</context.Provider>;
};

export const useProfile = () => useContext(context);
