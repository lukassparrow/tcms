import React, { Component } from 'react';

import _ from 'lodash';

import TestcaseStore from '../stores/testcaseStore';
import TestcaseActions from '../actions/testcaseActions';

import TCResults from '../components/TCResults';
import TCSteps from '../components/TCSteps';


class TC extends Component {
  constructor(props){
    super(props);
    this.state = {
      metadata: {},//TestcaseStore.getMetadata(this.props.tcid),
      results: {}
    }
  }

  _onChange(){
    this.setState({
      results: TestcaseStore.getResults(this.props.tcid),
      metadata: TestcaseStore.getMetadata(this.props.tcid)
    });
  }

  componentWillMount(){
    TestcaseStore.addChangeListener(this._onChange.bind(this));
  }

  componentDidMount(){
    setTimeout(() => {this.handleBackend()}, 1); //WAAAAAT ugly fucking hack FIXME
    //this.handleBackend();
  }

  componentWillUnmount(){
    TestcaseStore.removeChangeListener(this._onChange.bind(this));
  }

  handleAdd(outcome){
    TestcaseActions.addOutcome({tcid: this.props.tcid, user: this.props.user, outcome: outcome});
  }

  handleRemove(){
    TestcaseActions.removeOutcome({tcid: this.props.tcid, user: this.props.user});
  }

  handleBackend(){
    TestcaseActions.load_metadata({tcid: this.props.tcid});
    TestcaseActions.load_results({tcid: this.props.tcid});
  }

  render() {
    if(Object.keys(this.state.metadata).length === 0)
      return (<div>Loading</div>);

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
          <TCSteps steps={this.state.metadata.steps} title="Steps"/>
          <TCSteps steps={this.state.metadata.expected} title="Expected"/>
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

export default TC;