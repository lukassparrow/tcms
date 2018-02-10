import React, { Component } from 'react';
import { connect } from 'react-redux'

import { get_user, load_metadata } from '../actions/reduxActions'

class RootLayout extends Component {
    componentDidMount() {
        this.props.dispatch(get_user());
        this.props.dispatch(load_metadata({}))
    }

    render() {
        const userauth = this.props.user === '' ?
            (<a href="http://localhost:5000/oidc_login">Log in</a>) :
            (<a href="http://localhost:5000/oidc_logout">Logout user: {this.props.user}</a>);

        return (
            <div>
                <header>
                    <nav className="navbar navbar-light bg-light ">
                        <div className="container">
                            <span className="navbar-brand mb-0 h1"><a href="/">RTCMS</a></span>
                            <span className="navbar-text">
                                {userauth}
                            </span>
                        </div>
                    </nav>
                </header>
                <div className="App container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state

    return {
        user
    }
}

export default connect(mapStateToProps)(RootLayout);