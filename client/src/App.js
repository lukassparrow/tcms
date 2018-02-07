import React, { Component } from 'react';
import './App.css';

import TestcaseStore from './stores/testcaseStore';
import AppActions from './actions/appActions';
import TC from './components/TC';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: 'lbrabec',
      testcases: [],
      filter: ''
    }
  }

  handleSearch(e){
    this.setState({filter: e.target.value});
  }

  componentWillMount(){
    TestcaseStore.addAppChangeListener(this._onChange.bind(this));
  }

  componentDidMount(){
    AppActions.get_testcases({});
  }

  componentWillUnmount(){
    TestcaseStore.removeAppChangeListener(this._onChange.bind(this));
  }

  _onChange(){
    //console.log(TestcaseStore.getTestcases());
    this.setState({testcases: TestcaseStore.getTestcases()});
  }

  render() {
    const tcs = this.state.testcases.map((key) => {
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
