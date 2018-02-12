import React, { Component } from 'react';
import OutcomeBadge from '../components/OutcomeBadge';

class TCResults extends Component {
  render() {
    const results = Object.keys(this.props.results).map((key) => {
      return (
        <div key={key}>
          <OutcomeBadge outcome={this.props.results[key].outcome}>{key}</OutcomeBadge>{' '}
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

export default TCResults;