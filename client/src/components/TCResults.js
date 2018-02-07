import React, { Component } from 'react';

class TCResults extends Component {
  render() {
    const results = Object.keys(this.props.results).map((key) => {
      var badge_type = "";
      if(this.props.results[key] === "PASSED"){
        badge_type = "badge-success";
      } else
      if(this.props.results[key] === "INPROGRESS"){
        badge_type = "badge-info";
      } else {
        badge_type = "badge-danger";
      }
      
      return (
        <div key={key}>
          <span className={"badge " + badge_type}>
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

export default TCResults;