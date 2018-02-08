import { connect } from 'react-redux'
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';

import TestcaseStore from './stores/testcaseStore';
import { get_testcases } from './actions/reduxActions'
import TC from './components/TC';


class App extends Component {
  static propTypes = {
    testcases: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleSearch(e) {
    this.setState({ filter: e.target.value });
  }

  componentWillMount() {
    TestcaseStore.addAppChangeListener(this._onChange.bind(this));
  }

  componentDidMount() {
    this.props.dispatch(get_testcases());
  }

  componentWillUnmount() {
    TestcaseStore.removeAppChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({ testcases: TestcaseStore.getTestcases() });
  }

  render() {
    const { testcases } = this.props

    const tcs = testcases.map((key) => {
      return <TC user={'lbrabec'} tcid={key} key={key} filter={''} />
    });

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
                User: {'lbrabec'}
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
  const { testcases } = state

  return {
    testcases
  }
}

export default connect(mapStateToProps)(App)