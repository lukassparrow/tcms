import React from 'react';
import ReactDOM from 'react-dom';

import { Route, Redirect } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';

import App from './App';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/results" component={App} />
            <Redirect from="/" to="/results" />
        </Switch>
    </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
