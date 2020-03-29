import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './css/color.css';
import './css/modal.css';
import 'react-table/react-table.css';
import { ProfileProvider } from './hooks/useProfile';
import { MealProvider } from './hooks/useMeal';
import Home from './pages/Home';
import Cbt from './pages/Cbt';
import Admin from './pages/Admin';
import AdminEdit from './pages/Admin/AdminEdit';
import Privacy from './pages/Privacy';
import Subject from './pages/Subject';
import MyInfo from './pages/MyInfo';
import UserPermissionRoute from './utils/Route/UserPermissionRoute';
import Login from './pages/Login';
import AdminPermissionRoute from './utils/Route/AdminPermissionRoute';
import NotFoundError from './components/Error/NotFoundError';
import NoPermissionError from './components/Error/NoPermissionError';
import Register from './pages/Register';

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
                    <AdminPermissionRoute exact path="/admin" success={Admin} failure={NoPermissionError} />
                    <AdminPermissionRoute exact path="/admin/edit/:id" success={AdminEdit} failure={NoPermissionError} />
                    <Route exact path="/privacy" component={Privacy} />
                    <Route exact component={NotFoundError} />
                </Switch>
            </BrowserRouter>
        </MealProvider>
    </ProfileProvider>
);

ReactDOM.render(index, document.getElementById('root'));
