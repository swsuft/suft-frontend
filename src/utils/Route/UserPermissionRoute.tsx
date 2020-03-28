import React from 'react';
import useLogin from '../../hooks/useLogin';

interface UserPermissionRoute {
    path: string | string[];
    exact?: boolean;
    success: React.ComponentType<any>;
    failure: React.ComponentType<any>;
}

const UserPermissionRoute: React.FC<UserPermissionRoute> = ({ success: Success, failure: Failure }) => {
    const isLogin = useLogin();
    return isLogin ? <Success /> : <Failure />;
};

export default UserPermissionRoute;
