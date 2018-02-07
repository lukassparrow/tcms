import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

class TestCaseActions {
    addOutcome(payload){
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_OUTCOME,
            payload: payload
        });
    }

    removeOutcome(payload){
        Dispatcher.dispatch({
            actionType: ActionTypes.REMOVE_OUTCOME,
            payload: payload
        });
    }

    backend_call(payload){
        Dispatcher.dispatch({
            actionType: ActionTypes.BACKEND_CALL,
            payload: payload
        });
    }

    universal(payload, actionType){
        Dispatcher.dispatch({
            actionType: ActionTypes[actionType],
            payload: payload
        });
    }
}

export default new TestCaseActions();