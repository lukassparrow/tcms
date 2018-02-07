import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';
import api from '../utils/backendAPI';


class TestCaseActions {
    addOutcome(payload){
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_OUTCOME,
            payload: payload
        });

        api.add_outcome(payload.tcid, payload.user, payload.outcome);
    }

    removeOutcome(payload){
        Dispatcher.dispatch({
            actionType: ActionTypes.REMOVE_OUTCOME,
            payload: payload
        });

        api.remove_outcome(payload.tcid, payload.user);
    }

    //FIXME rename
    backend_call(payload){
        Dispatcher.dispatch({
            actionType: ActionTypes.BACKEND_CALL,
            payload: payload
        });

        api.load_results();
    }

    universal(payload, actionType){
        Dispatcher.dispatch({
            actionType: ActionTypes[actionType],
            payload: payload
        });
    }
}

export default new TestCaseActions();