import React, { createContext, useContext, useEffect, useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import useToken from './useToken';
import ErrorCode from '../error/ErrorCode';
import { getGraphQLError } from '../api/errorHandler';

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
            const gerror = getGraphQLError(error);
            if (!gerror) return;

            if (gerror[0] === ErrorCode.NO_PERMISSION) {
                refreshToken();
            } else {
                cogoToast.error(gerror[1]);
            }

            return;
        }

        setProfile(data.profile);
    }, [refreshToken, loading, error, data]);

    return <context.Provider value={profile}>{children}</context.Provider>;
};

export const useProfile = () => useContext(context);
