import React from 'react'
import ReactDOM from 'react-dom'

import { Route, Redirect } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import App from './App';
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
    /*
    <BrowserRouter>
        <Switch>
            <Route path="/results" component={App} />
            <Redirect from="/" to="/results" />
        </Switch>
    </BrowserRouter>
    */
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
