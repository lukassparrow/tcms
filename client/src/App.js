import { connect } from 'react-redux'
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';

import { get_testcases, get_user } from './actions/reduxActions'
import TC from './components/TC';


class App extends Component {
  static propTypes = {
    testcases: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleSearch(e) {
    this.setState({ filter: e.target.value });
  }

  componentDidMount() {
    this.props.dispatch(get_testcases());
    this.props.dispatch(get_user());
  }

  render() {
    const { testcases } = this.props

    const tcs = testcases.map((key) => {
      return <TC user={this.props.user} tcid={key} key={key} filter={''} />
    });

    const userauth = this.props.user === '' ?
      (<a href="http://localhost:5000/oidc_login">Log in</a>) :
      (<a href="http://localhost:5000/oidc_logout">Logout user: {this.props.user}</a>);

    return (
      <div>
        <header>
          <nav className="navbar navbar-light bg-light ">
            <div className="container">
              <span className="navbar-brand mb-0 h1">RTCMS</span>
              <form className="form-inline">
                <input className="form-control" type="text" placeholder="Search" onChange={this.handleSearch.bind(this)} />
              </form>
              <span className="navbar-text">
                {userauth}
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


const mapStateToProps = state => {
  const { testcases, user } = state

  return {
    testcases,
    user
  }
}

export default connect(mapStateToProps)(App)