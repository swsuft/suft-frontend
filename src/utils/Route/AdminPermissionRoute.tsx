import React from 'react';
import useAdmin from '../../hooks/useAdmin';

interface AdminPermissionRouteProps {
    path: string | string[];
    exact?: boolean;
    success: React.ComponentType<any>;
    failure: React.ComponentType<any>;
}

const AdminPermissionRoute: React.FC<AdminPermissionRouteProps> = ({ success: Success, failure: Failure }) => {
    const isAdmin = useAdmin();
    return isAdmin ? <Success /> : <Failure />;
};

export default AdminPermissionRoute;
