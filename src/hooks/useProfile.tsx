import React, { createContext, useContext, useEffect, useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import useToken from './useToken';
import ErrorCode from '../error/ErrorCode';

interface Profile {
    readonly email: string;
    readonly name: string;
    readonly grade: string;
    readonly isAdmin: boolean;
    readonly isBlocked: boolean;
    readonly root: boolean;
}

const context = createContext<Profile | undefined>(undefined);
const GET_PROFILE = gql`
    query {
        profile {
            email
            name
            grade
            isAdmin
            isBlocked
            root
        }
    }
`;

export const ProfileProvider: React.FC = ({ children }) => {
    const [profile, setProfile] = useState<Profile | undefined>(undefined);
    const refreshToken = useToken();
    const { loading, error, data } = useQuery(GET_PROFILE);

    useEffect(() => {
        if (loading) {
            return;
        }

        if (error) {
            const { code } = error.graphQLErrors[0].extensions!!;

            cogoToast.error('사용자 정보를 가져오지 못했어요.');
            if (code === ErrorCode.NO_PERMISSION) {
                refreshToken();
            }

            return;
        }

        setProfile(data.profile);
    }, [loading, error, data]);

    return <context.Provider value={profile}>{children}</context.Provider>;
};

export const useProfile = () => useContext(context);
