import React, { createContext, useContext, useEffect, useState } from 'react';
import useToken from './useToken';
import ErrorCode from '../error/ErrorCode';
import AuthApi from '../api/Auth';

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
        AuthApi.profile()
            .then((res) => {
                setProfile(res.data);
            })
            .catch((error) => {
                const { code } = error.response.data;

                setProfile({
                    success: false,
                    data: undefined
                });

                if (code === ErrorCode.JWT_EXPIRED) {
                    refreshToken();
                }
            });
    }, [refreshToken]);

    return <context.Provider value={profile}>{children}</context.Provider>;
};

export const useProfile = () => useContext(context);
