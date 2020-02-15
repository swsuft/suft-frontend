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
import RegisterPage from './pages/RegisterPage';
import Admin from './pages/Admin';
import AdminEdit from './pages/Admin/AdminEdit';
import Privacy from './pages/Privacy';
import Subject from './pages/Subject';

const index = (
    <BrowserRouter>
        <Switch>
            <ProfileProvider>
                <MealProvider>
                    <Route exact path="/" component={Home} />
                </MealProvider>
                <Route exact path="/cbt/:subject/:grade/:times" component={Cbt} />
                <Route exact path="/subject" component={Subject} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/admin/edit/:id" component={AdminEdit} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/privacy" component={Privacy} />
            </ProfileProvider>
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(index, document.getElementById('root'));
