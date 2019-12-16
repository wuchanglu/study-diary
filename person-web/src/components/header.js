import React from "react";
import "./header.scss";
class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choosedInded: 0,
      links: [
        { text: "JavaScript", key: "JavaScript" },
        { text: "H5+CSS3", key: "H5+CSS3" },
        { text: "Vue", key: "Vue" },
        { text: "React", key: "React" }
      ]
    };
  }
  render() {
    return (
      <section className="header">
        <header className="header__wrap">
          <Search></Search>
          <ul className="header__link">
            {this.state.links.map((item, index) => {
              return (
                <li
                  className={`link__item ${
                    this.state.choosedInded === index ? "link__item-choosed" : ""
                  }`}
                  key={item.key}
                >
                  {item.text}
                </li>
              );
            })}
          </ul>
        </header>
      </section>
    );
  }
}
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="logo"></div>;
  }
}
export default Head;
