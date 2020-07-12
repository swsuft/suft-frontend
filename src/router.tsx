import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import UserPermissionRoute from './utils/Route/UserPermissionRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Cbt from './pages/Cbt';
import Subject from './pages/Subject';
import Register from './pages/Register';
import MyInfo from './pages/MyInfo';
import Help from './pages/Help';
import MyProblemCreate from './pages/MyProblem/MyProblemCreate';
import MyProblemView from './pages/MyProblem/MyProblemView';
import MyProblemEdit from './pages/MyProblem/MyProblemEdit';
import AdminPermissionRoute from './utils/Route/AdminPermissionRoute';
import AdminProblemView from './pages/Admin/AdminProblemView';
import AdminUserView from './pages/Admin/AdminUserView';
import AdminWaitingUser from './pages/Admin/AdminWaitingUser';
import Privacy from './pages/Privacy';
import NotFoundError from './components/Error/NotFoundError';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <UserPermissionRoute exact path="/" success={Home} failure={Login} />
                <UserPermissionRoute exact path="/cbt/:subject/:grade/:times" success={Cbt} failure={Login} />
                <UserPermissionRoute exact path="/subject" success={Subject} failure={Login} />
                <UserPermissionRoute exact path="/login" success={Home} failure={Login} />
                <UserPermissionRoute exact path="/register" success={Home} failure={Register} />
                <UserPermissionRoute exact path="/myinfo" success={MyInfo} failure={Login} />
                <UserPermissionRoute exact path="/help" success={Help} failure={Login} />

                <UserPermissionRoute
                  exact
                  path="/myproblem"
                  success={() => <Redirect to="/myproblem/create" />}
                  failure={Login}
                />
                <UserPermissionRoute exact path="/myproblem/create" success={MyProblemCreate} failure={Login} />
                <UserPermissionRoute exact path="/myproblem/view" success={MyProblemView} failure={Login} />
                <UserPermissionRoute
                  exact
                  path="/myproblem/edit/:id"
                  success={MyProblemEdit}
                  failure={Login}
                />

                <AdminPermissionRoute
                  exact
                  path="/admin"
                  success={() => <Redirect to="/admin/view" />}
                  failure={Login}
                />
                <AdminPermissionRoute exact path="/admin/view" success={AdminProblemView} failure={Login} />
                <AdminPermissionRoute exact path="/admin/user" success={AdminUserView} failure={Login} />
                <AdminPermissionRoute
                  exact
                  path="/admin/waitinguser"
                  success={AdminWaitingUser}
                  failure={Login}
                />
                <Route exact path="/privacy" component={Privacy} />
                <Route exact component={NotFoundError} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
