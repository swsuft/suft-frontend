import React from 'react';
import { Route } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';

interface AdminPermissionRouteProps {
    path: string | string[];
    exact?: boolean;
    success: React.ComponentType<any>;
    failure: React.ComponentType<any>;
}

const AdminPermissionRoute: React.FC<AdminPermissionRouteProps> = ({ exact, path, success: Success, failure: Failure }) => {
    const isAdmin = useAdmin();
    const SuccessRoute = () => <Route exact={exact} path={path} component={Success} />;
    const FailureRoute = () => <Route exact={exact} path={path} component={Failure} />;
    return isAdmin ? <SuccessRoute /> : <FailureRoute />;
};

export default AdminPermissionRoute;
