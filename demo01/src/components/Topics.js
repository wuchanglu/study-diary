import React from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { counter } from "../redux/index.js";
class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: ""
    };
  }
  render() {
    console.log(this);
    return <h3>Requested Param: {this.props.match.params.id}</h3>;
  }
}

function Topics({ match,count }) {
  return (
    <div>
      <h2>Topics</h2>
      <p>{count}</p>
      <ul>
        <li>
          <Link to={`${match.url}/components-id`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

export default connect(
  counter.mapStateToProps,
  counter.mapDispatchToProps
)(Topics);