import React from 'react'
import ReactDOM from 'react-dom'

import { Route, Redirect } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import App from './App';
import SummaryApp from './SummaryApp';
import tc_reducer from './reducers';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import registerServiceWorker from './registerServiceWorker';

const loggerMiddleware = createLogger();

const store = createStore(tc_reducer, applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/result/:tcid?" component={App} />
                <Route path="/summary" component={SummaryApp} />
                <Redirect from="/" to="/summary" />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
