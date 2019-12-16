import React from "react";
import "./header.scss";
class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choosedIndex: 0,
      links: [
        { text: "Diary", key: "Diary" },
        { text: "Demo", key: "Demo" },
        // { text: "Vue", key: "Vue" },
        // { text: "React", key: "React" }
      ]
    };
    this.chooseItem = this.chooseItem.bind(this);
  }
  chooseItem(item, index) {
    this.setState({
      choosedIndex:index
    })
    console.log(item, index);
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
                    this.state.choosedIndex === index
                      ? "link__item-choosed"
                      : ""
                  }`}
                  key={item.key}
                  onClick={() => {
                    this.chooseItem(item, index);
                  }}
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
