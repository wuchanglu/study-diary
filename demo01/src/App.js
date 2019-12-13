import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { connect } from "react-redux";
import { counter } from "./redux/index";

import "./App.css"

import Home from "./components/Home.js";
import About from "./components/About.js";
import Topics from "./components/Topics.js";
import Login from "./components/Login"

function App(props) {
  return (
    <Router>
      <div>
        <p>{props.count}</p>
        <button type="primary" onClick={props.onIncreaseClick}>增加</button>
        <button type="danger" onClick={props.onReduceClick}>减少</button>
        <Header />
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
        
      </div>
    </Router>
  );
}
class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log(123);
  }
  render() {
    return (
      <ul>
        <li>Times</li>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>
    );
  }
}

export default connect(
  counter.mapStateToProps,
  counter.mapDispatchToProps
)(App);
