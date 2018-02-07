import React, { Component } from 'react';
import './App.css';

import TestcaseStore from './stores/testcaseStore';

import TC from './components/TC';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: 'lbrabec',
      filter: ''
    }
  }

  handleSearch(e){
    this.setState({filter: e.target.value});
  }

  render() {
    const tcs = Object.keys(TestcaseStore.getAllMetadata()).map((key) => {
      return <TC user={this.state.user} tcid={key} key={key} filter={this.state.filter}/>
    });

    return (
      <div>
        <header>
        <nav className="navbar navbar-light bg-light ">
          <div className="container">
          <span className="navbar-brand mb-0 h1">RTCMS</span>
          <form className="form-inline">
            <input className="form-control" type="text" placeholder="Search" onChange={this.handleSearch.bind(this)}/>
          </form>
          <span className="navbar-text">
          User: {this.state.user}
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




export default App;
