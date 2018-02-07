
import fetchJsonp from 'fetch-jsonp';

import ServerActions from '../actions/serverActions';

const API_URL = 'http://localhost:5000'


class BackendAPI {
    add_outcome(tcid, user, outcome) {

        fetchJsonp(API_URL + '/results/' + tcid + '/' + user + '/' + outcome)
            .then((resp) => { return resp.json(); })
            .then((json) => {
                ServerActions.addOutcome(json);
            });
    }

    remove_outcome(tcid, user) {

        fetchJsonp(API_URL + '/results/' + tcid + '/delete/' + user)
            .then((resp) => { return resp.json(); })
            .then((json) => {
                ServerActions.removeOutcome(json);
            });
    }

    load_metadata(tcid) {

        fetchJsonp(API_URL + "/metadata/" + tcid)
            .then((resp) => { return resp.json(); })
            .then((json) => {
                ServerActions.load_metadata({ tcid: tcid, data: json });
            });
    }

    load_results(tcid) {

        fetchJsonp(API_URL + "/results/" + tcid)
            .then((resp) => { return resp.json(); })
            .then((json) => {
                ServerActions.load_results({ tcid: tcid, data: json });
            });
    }

    get_testcaes(unused_now) {
        fetchJsonp(API_URL + "/testcases")
            .then((resp) => { return resp.json(); })
            .then((json) => {
                ServerActions.get_testcases(json);
            });
    }
}

export default new BackendAPI();