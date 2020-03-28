import React from 'react';
import { useProfile } from '../../hooks/useProfile';

interface UserPermissionRoute {
    path: string | string[];
    exact?: boolean;
    success: React.ComponentType<any>;
    failure: React.ComponentType<any>;
}

const UserPermissionRoute: React.FC<UserPermissionRoute> = ({ success: Success, failure: Failure }) => {
    const profile = useProfile();
    return profile.data === undefined || !profile.success ? <Failure /> : <Success />;
};

export default UserPermissionRoute;
