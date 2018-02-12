import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import _ from 'lodash';

import { load_results } from '../actions/reduxActions'
import OutcomeBadge from '../components/OutcomeBadge';


class TCOverview extends Component {

    componentDidMount() {
        this.props.dispatch(load_results({ tcid: this.props.tcid }))
    }

    render() {
        if (this.props.metadata === undefined ||
            this.props.results === undefined)
            return (<div>Loading</div>);

        const { metadata, results } = this.props;
        const resultsSummary = _(results).values().countBy('outcome').entries().value().map((entry) => {
            return entry.reduce((outcome, count) => {
                return (
                    <span key={this.props.tcid + outcome}>
                        <OutcomeBadge outcome={outcome}>{count.toString()}</OutcomeBadge>{' '}
                    </span>)
            });
        });

        return (
            <div className="testcase-summary">
                <div className="row">
                    <div className="col-6">
                        <Link to={"/result/" + this.props.tcid}>
                            {metadata.name}
                        </Link>
                    </div>
                    <div className="col-6 text-right">
                        {resultsSummary}
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    const { metadata, results } = state

    return {
        metadata: metadata[ownProps.tcid],
        results: results[ownProps.tcid]
    }
}

export default connect(mapStateToProps)(TCOverview);