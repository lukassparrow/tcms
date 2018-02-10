import { connect } from 'react-redux'
import React, { Component } from 'react';
import './App.css';

import TC from './components/TC';
import RootLayout from './components/RootLayout';


class DetailApp extends Component {
  render() {

    return (
      <RootLayout>
        <TC user={this.props.user} tcid={this.props.match.params.tcid} />
      </RootLayout>
    );
  }
}


const mapStateToProps = state => {
  const { user } = state

  return {
    user
  }
}

export default connect(mapStateToProps)(DetailApp)