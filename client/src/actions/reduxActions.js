import ActionTypes from '../constants';
import fetchJsonp from 'fetch-jsonp';

const API_URL = 'http://localhost:5000'

export const add_user_resp = payload => ({
    type: ActionTypes.GET_USER_RESP,
    payload: payload
})

export const add_outcome_resp = payload => ({
        type: ActionTypes.ADD_OUTCOME_RESP,
        payload: payload
})

export const remove_outcome_resp = payload => ({
        type: ActionTypes.REMOVE_OUTCOME_RESP,
        payload: payload
})

export const load_metadata_resp = payload => ({
        type: ActionTypes.LOAD_METADATA_RESP,
        payload: payload
})

export const load_results_resp = payload => ({
        type: ActionTypes.LOAD_RESULTS_RESP,
        payload: payload
})

export const get_testcases_resp = payload => ({
        type: ActionTypes.GET_TESTCASES_RESP,
        payload: payload
})


export const get_user = payload => dispatch => {
    dispatch({
        type: ActionTypes.GET_USER,
        payload: payload
    });

    fetchJsonp(API_URL + '/user')
        .then((resp) => { return resp.json(); })
        .then((json) => {
            console.log(json);
            dispatch(add_user_resp(json))
        });
}

export const add_outcome = payload => dispatch => {
    dispatch({
        type: ActionTypes.ADD_OUTCOME,
        payload: payload
    });

    fetchJsonp(API_URL + '/results/' + payload.tcid + '/add/' + payload.outcome)
        .then((resp) => { return resp.json(); })
        .then((json) => {
            dispatch(add_outcome_resp(json))
        });
}

export const remove_outcome = payload => dispatch => {
    dispatch({
        type: ActionTypes.REMOVE_OUTCOME,
        payload: payload
    });

    fetchJsonp(API_URL + '/results/' + payload.tcid + '/delete')
        .then((resp) => { return resp.json(); })
        .then((json) => {
            dispatch(remove_outcome_resp(json))
        });
}

export const load_metadata = payload => dispatch => {
    dispatch({
        type: ActionTypes.LOAD_METADATA,
        payload: payload
    });

    fetchJsonp(API_URL + "/metadata/" + payload.tcid)
        .then((resp) => { return resp.json(); })
        .then((json) => {
            dispatch(load_metadata_resp({ tcid: payload.tcid, data: json }));
        });
}

export const load_results = payload => dispatch => {
    dispatch({
        type: ActionTypes.LOAD_RESULTS,
        payload: payload
    });

    fetchJsonp(API_URL + "/results/" + payload.tcid)
        .then((resp) => { return resp.json(); })
        .then((json) => {
            dispatch(load_results_resp({ tcid: payload.tcid, data: json }));
        });
}

export const get_testcases = payload => dispatch => {
    dispatch({
        type: ActionTypes.GET_TESTCASES,
        payload: payload
    });

    fetchJsonp(API_URL + "/testcases")
        .then((resp) => { return resp.json(); })
        .then((json) => {
            dispatch(get_testcases_resp(json));
        });
}

