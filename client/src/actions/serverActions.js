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

    load_metadata(payload){
        Dispatcher.dispatch({
            actionType: ActionTypes.LOAD_METADATA_RESP,
            payload: payload
        });
    }

    load_results(payload){
        Dispatcher.dispatch({
            actionType: ActionTypes.BACKEND_CALL_RESP,
            payload: payload
        });
    }

    get_testcases(payload){
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_TESTCASES_RESP,
            payload: payload
        });
    }

}

export default new TestCaseActions();