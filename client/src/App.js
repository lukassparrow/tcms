import React, { Component } from 'react';
import './App.css';
import TestcaseStore from './stores/testcaseStore';
import TestcaseActions from './actions/testcaseActions';
import _ from 'lodash';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: 'lbrabec',
      filter: ''
    }
  }

  handleSearch(e){
    this.setState({filter: e.target.value});
  }

  render() {
    const tcs = Object.keys(TestcaseStore.getAllMetadata()).map((key) => {
      return <TC user={this.state.user} tcid={key} key={key} filter={this.state.filter}/>
    });

    return (
      <div>
        <header>
        <nav className="navbar navbar-light bg-light ">
          <div className="container">
          <span className="navbar-brand mb-0 h1">RTCMS</span>
          <form className="form-inline">
            <input className="form-control" type="text" placeholder="Search" onChange={this.handleSearch.bind(this)}/>
          </form>
          <span className="navbar-text">
          User: {this.state.user}
          </span>
          </div>
        </nav>
        </header>
        <div className="App container">
          {tcs}
        </div>
      </div>
    );
  }
}

class TC extends Component {
  constructor(props){
    super(props);
    this.state = {
      metadata: TestcaseStore.getMetadata(this.props.tcid),
      results: {}
    }
  }

  _onChange(){
    console.log("Setting state for " + this.props.tcid);
    this.setState({results: TestcaseStore.getResults(this.props.tcid)});
  }

  componentWillMount(){
    TestcaseStore.addChangeListener(this._onChange.bind(this));
  }

  componentDidMount(){
    this.handleBackend();
  }

  componentWillUnmount(){
    TestcaseStore.removeChangeListener(this._onChange.bind(this));
  }

  handleAdd(outcome){
    TestcaseActions.addOutcome({tcid: this.props.tcid, user: this.props.user, outcome: outcome});
  }

  handleRemove(){
    console.log(this);
    TestcaseActions.removeOutcome({tcid: this.props.tcid, user: this.props.user});
  }

  handleBackend(){
    TestcaseActions.backend_call({url: 'http://localhost:5000/results/'+this.props.tcid, tcid: this.props.tcid});
  }

  render() {
    var hidden = "";
    if(! _.toLower(this.state.metadata.name).includes(_.toLower(this.props.filter))){
      hidden = "hidden";
    }
    return (
      <div className={"testcase "+hidden}>
        <div className="row">
          <div className="col">
            <h2>{this.state.metadata.name}</h2>
          </div>
        </div>
        <div className="row description">
          <div className="col">{this.state.metadata.description}</div>
        </div>
        <br />
        <div className="row justify-content-start">
          <TCSteps steps={this.state.metadata.steps} />
          <TCExcpected expected={this.state.metadata.expected}/>
          <TCResults results={this.state.results} />
        </div>
        <br />

        <b>Your result:</b><br />
        <button type="button" className="btn btn-sm btn-success" onClick={()=> this.handleAdd('PASSED')}>Passed</button>{' '}
        <button type="button" className="btn btn-sm btn-danger" onClick={()=> this.handleAdd('FAILED')}>Failed</button>{' '}
        <button type="button" className="btn btn-sm btn-info" onClick={()=> this.handleAdd('INPROGRESS')}>In Progress</button>{' '}
        <button type="button" className="btn btn-sm btn-dark" onClick={this.handleRemove.bind(this)}>Remove</button>{' '}
        
      </div>
    );
  }
}

class TCResults extends Component {
  render() {
    const results = Object.keys(this.props.results).map((key) => {
      var badge_type = "";
      if(this.props.results[key] == "PASSED"){
        badge_type = "badge-success";
      } else
      if(this.props.results[key] == "INPROGRESS"){
        badge_type = "badge-info";
      } else {
        badge_type = "badge-danger";
      }
      
      return (
        <div>
          <span className={"badge " + badge_type} key={key}>
            {key + ": " + this.props.results[key]}
          </span>{' '}
        </div>
      )
    });

    return (
      <div className="col-4">
        <b>Results:</b>
        {results}
      </div>
    );
  }
}

class TCSteps extends Component {
  render() {
    var number = 0;
    const steps = this.props.steps.map((step) => {
      number++;
      return (
        <div className="numline" key={step}><div className="number">{number}.</div>{step}</div>
      )
    });

    return (
      <div className="col-4 steps">
      <b>Steps:</b>
        {steps}
      </div>
    );
  }
}

class TCExcpected extends Component {
  render() {
    var number = 0;
    const expected = this.props.expected.map((e) => {
      number++;
      return (
        <div className="numline" key={e}><div className="number">{number}.</div>{e}</div>
      )
    });
    
    return (
      <div className="col-4 expected">
      <b>Expected:</b>
        {expected}
      </div>
    );
  }
}





export default App;
