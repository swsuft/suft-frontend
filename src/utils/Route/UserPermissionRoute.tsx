import React from 'react';
import { Route } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

interface UserPermissionRoute {
    path: string | string[];
    exact?: boolean;
    success: React.ComponentType<any>;
    failure: React.ComponentType<any>;
}

const UserPermissionRoute: React.FC<UserPermissionRoute> = ({ path, exact, success: Success, failure: Failure }) => {
    const isLogin = useLogin();
    const SuccessRoute = () => <Route exact={exact} path={path} component={Success} />;
    const FailureRoute = () => <Route exact={exact} path={path} component={Failure} />;
    return isLogin ? <SuccessRoute /> : <FailureRoute />;
};

export default UserPermissionRoute;
