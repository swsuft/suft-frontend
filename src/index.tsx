import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ProfileProvider } from './hooks/useProfile';
import { MealProvider } from './hooks/useMeal';
import { Client } from './api';
import Router from './router';

import './css/color.css';
import './css/modal.css';

const index = (
    <ApolloProvider client={Client}>
        <ProfileProvider>
            <MealProvider>
                <Router />
            </MealProvider>
        </ProfileProvider>
    </ApolloProvider>
);

ReactDOM.render(index, document.getElementById('root'));
