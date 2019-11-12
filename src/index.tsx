import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProfileProvider } from './hooks/useProfile';
import { MealProvider } from './hooks/useMeal';
import Main from './pages/Main';
import Cbt from './pages/Cbt';
import RegisterPage from './pages/RegisterPage';
import Admin from './pages/Admin';
import AdminEdit from './pages/Admin/AdminEdit';
import Info from './pages/Info';

import './css/color.css';
import Privacy from './pages/Privacy';

const index = (
    <BrowserRouter>
        <Switch>
            <ProfileProvider>
                <MealProvider>
                    <Route exact path="/" component={Main}/>
                </MealProvider>
                <Route exact path="/cbt/:subject/:grade/:times" component={Cbt}/>
                <Route exact path="/admin" component={Admin}/>
                <Route exact path="/admin/edit/:id" component={AdminEdit}/>
                <Route exact path="/register" component={RegisterPage}/>
                <Route exact path="/info" component={Info}/>
            </ProfileProvider>
                <Route exact path="/privacy" component={Privacy}/>
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(index, document.getElementById('root'));
