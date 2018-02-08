import React from 'react';
import ReactDOM from 'react-dom';

import { Route, Redirect } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import { createStore } from 'redux'

import App from './App';
import tc_reducer from './reducers';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(tc_reducer);

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/results" component={App} />
            <Redirect from="/" to="/results" />
        </Switch>
    </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
