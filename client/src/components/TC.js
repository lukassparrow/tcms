import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';

import { load_metadata, load_results, add_outcome, remove_outcome } from '../actions/reduxActions'
import TCResults from '../components/TCResults';
import TCSteps from '../components/TCSteps';


class TC extends Component {

  componentDidMount() {
    this.props.dispatch(load_metadata({ tcid: this.props.tcid }))
    this.props.dispatch(load_results({ tcid: this.props.tcid }))
  }

  handleOutcome(outcome) {
    this.props.dispatch(add_outcome({ tcid: this.props.tcid, user: this.props.user, outcome: outcome }));
  }

  handleRemove() {
    this.props.dispatch(remove_outcome({ tcid: this.props.tcid, user: this.props.user }));
  }

  render() {
    if (this.props.metadata[this.props.tcid] === undefined ||
      this.props.results[this.props.tcid] === undefined)
      return (<div>Loading</div>);

    const metadata = this.props.metadata[this.props.tcid];
    const results = this.props.results[this.props.tcid];

    var hidden = "";
    if (!_.toLower(metadata.name).includes(_.toLower(this.props.filter))) {
      hidden = "hidden";
    }

    return (
      <div className={"testcase " + hidden}>
        <div className="row">
          <div className="col">
            <h2>{metadata.name}</h2>
          </div>
        </div>
        <div className="row description">
          <div className="col">{metadata.description}</div>
        </div>
        <br />
        <div className="row justify-content-start">
          <TCSteps steps={metadata.steps} title="Steps" />
          <TCSteps steps={metadata.expected} title="Expected" />
          <TCResults results={results} />
        </div>
        <br />

        <b>Your result:</b><br />
        <button type="button" className="btn btn-sm btn-success" onClick={() => this.handleOutcome('PASSED')}>Passed</button>{' '}
        <button type="button" className="btn btn-sm btn-danger" onClick={() => this.handleOutcome('FAILED')}>Failed</button>{' '}
        <button type="button" className="btn btn-sm btn-info" onClick={() => this.handleOutcome('INPROGRESS')}>In Progress</button>{' '}
        <button type="button" className="btn btn-sm btn-dark" onClick={this.handleRemove.bind(this)}>Remove</button>{' '}

      </div>
    );
  }
}

const mapStateToProps = state => {
  const { metadata, results } = state

  return {
    metadata,
    results
  }
}

export default connect(mapStateToProps)(TC);