
import fetchJsonp from 'fetch-jsonp';

import ServerActions from '../actions/serverActions';

const API_URL = 'http://localhost:5000'


class BackendAPI {
    add_outcome(tcid, user, outcome){
        console.log(tcid+" "+user+" "+outcome);

        fetchJsonp(API_URL+'/results/'+tcid+'/'+user+'/'+outcome)
            .then((resp)=>{ return resp.json();})
            .then((json)=>{
                console.log(json);
                ServerActions.addOutcome(json);
            });
    }

    remove_outcome(tcid, user){
        console.log(tcid+" "+user);

        fetchJsonp(API_URL+'/results/'+tcid+'/delete/'+user)
            .then((resp)=>{ return resp.json();})
            .then((json)=>{
                console.log(json);
                ServerActions.removeOutcome(json);
            });
    }

    load_results(tcid){
        console.log("loading results");

        fetchJsonp(API_URL+"/results/"+tcid)
            .then((resp)=>{ return resp.json();})
            .then((json)=>{
                console.log(json);
                ServerActions.load_results({tcid: tcid, data: json});
            });
    }
}

export default new BackendAPI();