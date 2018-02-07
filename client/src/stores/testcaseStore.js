import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

const CHANGE = 'CHANGE';

var tcsmetadata = {
    'kittenkilld': {
      name: 'Install kittenkilld',
      description: 'Ugly kitten killing testcase. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam rhoncus aliquam metus.',
      steps: ['obtain a kitten', 'kill the kitten', '?', 'profit'],
      expected: ['you have a kitten', 'the kitten is no more', '?', 'dem shekels'],
    },
    'troll-kamil': {
      name: 'Skladanka-level Trolling',
      description: 'Just everyday joy. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Nulla quis diam. Integer tempor. Curabitur sagittis hendrerit ante. Nullam lectus justo, vulputate eget mollis sed, tempor sed magna. Integer lacinia. In dapibus augue non sapien.',
      steps: ['troll kamil', '?', 'lol'],
      expected: ['kamil is angry', '?', 'rofl'],
    },
    'lipsum': {
        name: 'Lorem Ipsum Testcase',
        description: 'Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Nulla quis diam. Integer tempor. Curabitur sagittis hendrerit ante. Nullam lectus justo, vulputate eget mollis sed, tempor sed magna. Integer lacinia. In dapibus augue non sapien.',
        steps: ['step one', 'step two'],
        expected: ['yeah', 'blah blah'],
      }
  }
  
var fakeresultsdb = {}

class TestcaseStore extends EventEmitter {
    constructor(){
        super();

        Dispatcher.register(this._registerToActions.bind(this));
    }

    _registerToActions(action){
        switch(action.actionType){
            case ActionTypes.ADD_OUTCOME_RESP:
                this._addOutcome(action.payload);
            break;
            case ActionTypes.REMOVE_OUTCOME_RESP:
                this._removeOutcome(action.payload)
            break;
            
            case ActionTypes.BACKEND_CALL_RESP:
                this._load_results(action.payload)
            break;

            default:
            break;
        }
    }

    _addOutcome(payload){
        console.log(payload);
        
        fakeresultsdb = payload;
        this.emit(CHANGE);
    }

    _removeOutcome(payload){
        console.log(payload);
        
        fakeresultsdb = payload;
        this.emit(CHANGE);
    }

    _load_results(payload){
        console.log(payload);
        
        fakeresultsdb[payload.tcid] = payload.data;
        this.emit(CHANGE);
    }

    getResults(tcid){
        return (fakeresultsdb[tcid] === undefined)? {} : fakeresultsdb[tcid];
    }

    getAllMetadata(filter){
        return tcsmetadata;        
    }

    getMetadata(tcid){
        return tcsmetadata[tcid];
    }

    addChangeListener(callback){
        this.on(CHANGE, callback);
    }

    removeChangeListener(callback){
        this.removeListener(CHANGE, callback);
    }
}

export default new TestcaseStore();