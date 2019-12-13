import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  Alert
} from "react-native";

import { connect } from "react-redux";
import * as counterAction from "../src/actions/counterAction";
import Button from "../src/components/Button";

const requestUrl = "https://facebook.github.io/react-native/movies.json";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }
  componentDidMount() {
    getList(res => {
      console.log(res);
      this.setState({
        movies: res.movies.map(item => {
          item.posters = {};
          item.posters.thumbnail =
            "http://resizing.flixster.com/1FxtmlxCqRb0EPdHFrFDGpZ45CE=/54x75/dkpu1ddg7pbsk.cloudfront.net/movie/31/16/311623_ori.jpg";
          return item;
        })
      });
    });
  }
  render() {
    const { count, incrementFn, decrementFn } = this.props;
    console.log(count, incrementFn, decrementFn);
    return (
      <ScrollView>
        <MyCos count={count}/>
        {this.state.movies.map((item, index) => (
          <Cell
            count={count}
            incrementFn={incrementFn}
            decrementFn={decrementFn}
            key={index}
            imgUrl={item.posters.thumbnail}
            title={item.title}
            year={item.releaseYear}
          />
        ))}
      </ScrollView>
    );
  }
}
class MyCos extends Component {
  render() {
    const { count, incrementFn, decrementFn } = this.props;
    return <Text>{count}</Text>;
  }
}
class Cell extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { decrementFn, incrementFn, count } = this.props;
    console.log(count);
    return (
      <TouchableNativeFeedback>
        <View style={styles.cell}>
          <Image
            style={styles.image}
            source={{
              uri: this.props.imgUrl
            }}
          />
          <View style={styles.message}>
            <Text>{count}</Text>
            <Text onPress={decrementFn} style={styles.title}>
              {this.props.title}
            </Text>
            <Text onPress={incrementFn} style={styles.year}>
              {this.props.year}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
const styles = StyleSheet.create({
  cell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 5
  },
  message: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    height: 80
  },
  title: {
    marginBottom: 5,
    fontSize: 16,
    textAlign: "center"
  },
  year: {
    fontSize: 14,
    color: "#999",
    textAlign: "center"
  }
});
function getList(fun) {
  fetch(requestUrl)
    .then(response => response.json())
    .then(fun)
    .catch(err => {
      console.error(err);
    });
}
export default connect(
  state => ({
    count: state.counter.count
  }),
  dispatch => ({
    incrementFn: () => dispatch(counterAction.increment()),
    decrementFn: () => dispatch(counterAction.decrement())
  })
)(Index);
