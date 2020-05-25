import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './css/color.css';
import './css/modal.css';
import { ProfileProvider } from './hooks/useProfile';
import { MealProvider } from './hooks/useMeal';
import Home from './pages/Home';
import Cbt from './pages/Cbt';
import MyProblemEdit from './pages/MyProblem/MyProblemEdit';
import Privacy from './pages/Privacy';
import Subject from './pages/Subject';
import MyInfo from './pages/MyInfo';
import UserPermissionRoute from './utils/Route/UserPermissionRoute';
import Login from './pages/Login';
import AdminPermissionRoute from './utils/Route/AdminPermissionRoute';
import NotFoundError from './components/Error/NotFoundError';
import NoPermissionError from './components/Error/NoPermissionError';
import Register from './pages/Register';
import MyProblemCreate from './pages/MyProblem/MyProblemCreate';
import MyProblemView from './pages/MyProblem/MyProblemView';
import AdminProblemView from './pages/Admin/AdminProblemView';
import AdminUserView from './pages/Admin/AdminUserView';
import AdminWaitingUser from './pages/Admin/AdminWaitingUser';
import Help from './pages/Help';

const index = (
    <ProfileProvider>
        <MealProvider>
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
                      failure={NoPermissionError}
                    />

                    <AdminPermissionRoute
                      exact
                      path="/admin"
                      success={() => <Redirect to="/admin/view" />}
                      failure={NoPermissionError}
                    />
                    <AdminPermissionRoute
                      exact
                      path="/admin/view"
                      success={AdminProblemView}
                      failure={NoPermissionError}
                    />
                    <AdminPermissionRoute
                      exact
                      path="/admin/user"
                      success={AdminUserView}
                      failure={NoPermissionError}
                    />
                    <AdminPermissionRoute
                      exact
                      path="/admin/waitinguser"
                      success={AdminWaitingUser}
                      failure={NoPermissionError}
                    />
                    <Route exact path="/privacy" component={Privacy} />
                    <Route exact component={NotFoundError} />
                </Switch>
            </BrowserRouter>
        </MealProvider>
    </ProfileProvider>
);

ReactDOM.render(index, document.getElementById('root'));
