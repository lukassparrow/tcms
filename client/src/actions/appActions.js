import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';
import api from '../utils/backendAPI';


class AppActions {
    get_testcases(payload){
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_TESTCASES,
            payload: payload
        });

        api.get_testcaes(payload);
    }
}

export default new AppActions();