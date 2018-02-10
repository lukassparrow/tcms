import React, { Component } from 'react';
import { Icon } from 'react-fa';

class OutcomeBadge extends Component {
    render() {
        var badge_type = "";
        var icon = null;
        if (this.props.outcome === "PASSED") {
            badge_type = "badge-success";
            icon = <Icon name="check-circle" />;
        } else if (this.props.outcome === "INPROGRESS") {
            badge_type = "badge-info";
            icon = <Icon name="spinner" pulse />;
        } else if (this.props.outcome === "WARNING") {
            badge_type = "badge-warning color-white";
            icon = <Icon name="exclamation-circle" />;
        } else {
            badge_type = "badge-danger";
            icon = <Icon name="times-circle" />;
        }
        return (<span className={"badge " + badge_type}>{icon}{" "}{this.props.children}</span>)
    }
}

export default OutcomeBadge;