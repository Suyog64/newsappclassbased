
import './App.css';

import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar';
import Navbar from './component/Navbar';
import News from './component/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize=6;
  apiKey = process.env.REACT_APP_NEWS_API_KEY;
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            
          />
          <Switch>
            <Route exact key="general" path="/"><News apiKey={this.apiKey} setProgress={this.setProgress}  pageSize={this.pageSize} category="general"/></Route>
            <Route exact key="business" path="/business"><News  apiKey={this.apiKey}  setProgress={this.setProgress} pageSize={this.pageSize} category="business"/></Route>
            <Route exact key="entertainment" path="/entertainment"><News  apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} category="entertainment"/></Route>
            <Route exact key="general" path="/general"><News  apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} category="general"/></Route>
            <Route exact key="health" path="/health"><News  apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} category="health"/></Route>
            <Route exact key="science" path="/science"><News  apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} category="science"/></Route>
            <Route exact key="sports" path="/sports"><News  apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} category="sports"/></Route>
            <Route exact key="technology" path="/technology"><News  apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} category="technology"/></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

