import { connect } from 'react-redux'
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';

import { get_testcases } from './actions/reduxActions'
import TCOverview from './components/TCOverview';
import RootLayout from './components/RootLayout';


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
  }

  render() {
    const { testcases } = this.props

    const tcs = testcases.map((key) => {
      return <TCOverview tcid={key} key={key} />
    });

    return (
        <RootLayout> {tcs} </RootLayout>
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