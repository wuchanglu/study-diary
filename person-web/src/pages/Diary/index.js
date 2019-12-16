import React from "react";
import "./diary.scss";
class Diary extends React.Component {
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
      </div>
    );
  }
}
class Navigation extends React.Component {
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
export default Diary;
