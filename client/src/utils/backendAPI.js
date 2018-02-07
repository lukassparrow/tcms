
import fetchJsonp from 'fetch-jsonp';

const API_URL = 'http://localhost:5000'

//FIXME! add dispatching

class BackendAPI {
    add_outcome(tcid, user, outcome){
        console.log(tcid+" "+user+" "+outcome);

        fetchJsonp(API_URL+'/results/'+tcid+'/'+user+'/'+outcome)
            .then((resp)=>{ return resp.json();})
            .then((json)=>{
                console.log(json);
                //DISPATCH!
            });
    }

    remove_outcome(tcid, user){
        console.log(tcid+" "+user);

        fetchJsonp(API_URL+'/results/'+tcid+'/delete/'+user)
        .then((resp)=>{ return resp.json();})
        .then((json)=>{
            console.log(json);
            //DISPATCH!!
        });
    }

    load_results(tcid){
        console.log("loading results");

        fetchJsonp(API_URL+"/results/"+tcid)
            .then((resp)=>{ return resp.json();})
            .then((json)=>{
                console.log(json);
                //DISPATCH!!
            });
    }
}

export default new BackendAPI();