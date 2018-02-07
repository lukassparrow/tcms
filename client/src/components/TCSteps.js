import React, { Component } from 'react';

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
      <b>{this.props.title}:</b>
        {steps}
      </div>
    );
  }
}

export default TCSteps;