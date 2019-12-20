import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link,withRouter } from "react-router-dom";
import "./diary.scss";
import Detail from "./detail/detail";
class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
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
            <Switch>
              <Route path="/">
                <Content></Content>
              </Route>
              <Route path="/detail">
                <Detail></Detail>
              </Route>
            </Switch>
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
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          title: "git时光穿梭机-版本回退",
          content:
            "在平时的工作中,经常会遇到git版本回退的问题.这里总结一下遇到的情况供需要的时候查询。1 当你改乱了工作区某个文件的内容,想直接丢弃工作区的修改时,用命令",
          time: "2019-11-13",
          type: "Linux",
          tags: ["Linux", "重定向", "管道"]
        }
      ]
    };
    this.linkToDetail = this.linkToDetail.bind(this);
  }
  linkToDetail(item, index) {
    console.log(this, item, index);
  }
  render() {
    return (
      <div className="content">
        {this.state.list.map((item, index) => {
          return (
            <article
              className="content__item"
              key={index}
              onClick={() => {
                return this.linkToDetail(item, index);
              }}
            >
              <header className="item__header">
                <a href="#" className="header__title">
                  {item.title}
                </a>
              </header>
              <div className="item__body">{item.content}</div>
              <footer className="item__footer">
                发布于{" "}
                <a href="#" className="footer__link">
                  {item.time}
                </a>
                。 属于
                <a href="#" className="footer__link">
                  {item.type}
                </a>
                分类，被贴了
                {item.tags.map((tag, tagIndex) => {
                  return (
                    <Fragment key={tagIndex}>
                      <a href="#" className="footer__link">
                        {tag}
                      </a>
                      {tagIndex < item.tags.length ? " - " : ""}
                    </Fragment>
                  );
                })}
                标签
              </footer>
            </article>
          );
        })}
      </div>
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
export default Diary;
