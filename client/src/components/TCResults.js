import React, { Component } from 'react';
import { Icon } from 'react-fa';

class TCResults extends Component {
  render() {
    const results = Object.keys(this.props.results).map((key) => {
      var badge_type = "";
      var icon = null;
      if(this.props.results[key] === "PASSED"){
        badge_type = "badge-success";
        icon = <Icon name="check-circle" />;
      } else
      if(this.props.results[key] === "INPROGRESS"){
        badge_type = "badge-info";
        icon = <Icon name="spinner" pulse/>;
      } else {
        badge_type = "badge-danger";
        icon = <Icon name="times-circle" />;
      }
      
      return (
        <div key={key}>
          <span className={"badge " + badge_type}>
          { icon }{" " + key + " "}
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