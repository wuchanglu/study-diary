import React, { Fragment, Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import "./diary.scss";
import Detail from "./detail/detail";
import Content from "./content/content";
class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props)
    return (
      <div className="diary">
        <hgroup>
          <h1 className="diary__title">吴昌禄学习日记</h1>
          <h3 className="diary__discription">
            我的学习日记网站就是自己拿来练习React的
          </h3>
        </hgroup>
        <Navigation></Navigation>
        <section className="diary__section">
          <Router>
            <Route path="/list">
              <Content></Content>
            </Route>
            <Route path="/detail">
              <Detail></Detail>
            </Route>
          </Router>

          <WidgetArea></WidgetArea>
        </section>
      </div>
    );
  }
}
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navList: [
        { url: "", text: "全部" },
        { url: "", text: "H5+CSS3" },
        { url: "", text: "JavaScript&ECMAScript" },
        { url: "", text: "Vue" },
        { url: "", text: "React" }
      ]
    };
  }
  render() {
    return (
      <nav className="navigation">
        <ul>
          {this.state.navList.map((item, index) => {
            return <li key={index}>{item.text}</li>;
          })}
        </ul>
      </nav>
    );
  }
}

class WidgetArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="wideg-area">
        <div className="wideg-area__search">
          <input className="search__input" placeholder="搜索"></input>
          <button className="search__button">搜索</button>
        </div>
      </div>
    );
  }
}
export default withRouter(Diary);
