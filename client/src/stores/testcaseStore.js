import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

const CHANGE = 'CHANGE';
const APPCHANGE = 'APPCHANGE';

var tcsmetadata = {};
var fakeresultsdb = {};
var testcases = [];

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