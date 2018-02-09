import ActionTypes from '../constants';

export default (state = { metadata: {}, results: {}, testcases: [], user: ''}, action) => {
    switch (action.type) {
        case ActionTypes.GET_USER_RESP:
            return {
                ...state,
                user: action.payload.email
            }
        case ActionTypes.ADD_OUTCOME_RESP:
            return {
                ...state,
                results: action.payload
            }
        case ActionTypes.REMOVE_OUTCOME_RESP:
            return {
                ...state,
                results: action.payload
            }
        case ActionTypes.BACKEND_CALL_RESP:
            return {
                ...state,
                results: {
                    ...state.results,
                    [action.payload.tcid]: action.payload.data
                }
            }

        case ActionTypes.LOAD_METADATA_RESP:
            return {
                ...state,
                metadata: {
                    ...state.metadata,
                    [action.payload.tcid]: action.payload.data
                }
            }

        case ActionTypes.GET_TESTCASES_RESP:
            return {
                ...state,
                testcases: action.payload.testcases
            }

        default:
            return state;
    }
}