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
                this._addOutcome(action.payload);
                break;
            case ActionTypes.REMOVE_OUTCOME_RESP:
                this._removeOutcome(action.payload)
                break;

            case ActionTypes.BACKEND_CALL_RESP:
                this._load_results(action.payload)
                break;

            case ActionTypes.LOAD_METADATA_RESP:
                this._load_metadata(action.payload)
                break;


            case ActionTypes.GET_TESTCASES_RESP:
                this._get_testcases(action.payload)
                break;

            default:
                break;
        }
    }

    _addOutcome(payload) {
        fakeresultsdb = payload;
        this.emit(CHANGE);
    }

    _removeOutcome(payload) {
        fakeresultsdb = payload;
        this.emit(CHANGE);
    }

    _load_results(payload) {
        fakeresultsdb[payload.tcid] = payload.data;
        this.emit(CHANGE);
    }

    _load_metadata(payload) {
        tcsmetadata[payload.tcid] = payload.data;
        this.emit(CHANGE);
    }

    _get_testcases(payload) {
        testcases = payload.testcases;
        this.emit(APPCHANGE);
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