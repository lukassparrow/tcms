import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

const CHANGE = 'CHANGE';
const APPCHANGE = 'APPCHANGE';

var tcsmetadata = {};
var fakeresultsdb = {};
var testcases = [];

function tc_reducer(state = { metadata: {}, results: {}, testcases: [] }, action) {
    switch (action.actionType) {
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
            return state
            break;
    }
}

console.log(tc_reducer({ metadata: {}, results: {}, testcases: [] }, { actionType: ActionTypes.ADD_OUTCOME_RESP }));

class TestcaseStore extends EventEmitter {
    constructor() {
        super();

        Dispatcher.register(this._registerToActions.bind(this));
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case ActionTypes.ADD_OUTCOME_RESP:
                fakeresultsdb = action.payload;
                this.emit(CHANGE);
                break;
            case ActionTypes.REMOVE_OUTCOME_RESP:
                fakeresultsdb = action.payload;
                this.emit(CHANGE);
                break;

            case ActionTypes.BACKEND_CALL_RESP:
                fakeresultsdb[action.payload.tcid] = action.payload.data;
                this.emit(CHANGE);
                break;

            case ActionTypes.LOAD_METADATA_RESP:
                tcsmetadata[action.payload.tcid] = action.payload.data;
                this.emit(CHANGE);
                break;


            case ActionTypes.GET_TESTCASES_RESP:
                testcases = action.payload.testcases;
                this.emit(APPCHANGE);
                break;

            default:
                break;
        }
    }

    getResults(tcid) {
        return (fakeresultsdb[tcid] === undefined) ? {} : fakeresultsdb[tcid];
    }

    getTestcases() {
        return testcases;
    }

    getMetadata(tcid) {
        return (tcsmetadata[tcid] === undefined) ? {} : tcsmetadata[tcid];
    }

    addChangeListener(callback) {
        this.on(CHANGE, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE, callback);
    }

    addAppChangeListener(callback) {
        this.on(APPCHANGE, callback);
    }

    removeAppChangeListener(callback) {
        this.removeListener(APPCHANGE, callback);
    }
}

export default new TestcaseStore();