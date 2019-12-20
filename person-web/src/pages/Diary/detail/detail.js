import React from "react";
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props)
    return <div>detail</div>;
  }
}
export default Detail;
