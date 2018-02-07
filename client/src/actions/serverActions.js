import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';


class TestCaseActions {
    addOutcome(payload){
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_OUTCOME_RESP,
            payload: payload
        });
    }

    removeOutcome(payload){
        Dispatcher.dispatch({
            actionType: ActionTypes.REMOVE_OUTCOME_RESP,
            payload: payload
        });

    }

    load_results(payload){
        Dispatcher.dispatch({
            actionType: ActionTypes.BACKEND_CALL_RESP,
            payload: payload
        });
    }

}

export default new TestCaseActions();