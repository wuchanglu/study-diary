/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Index from "./page/index";
import { Provider } from "react-redux";
import configureStore from "./src/store/ConfigureStore";
const store = configureStore();

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Index />
      </SafeAreaView>
    </Fragment>
  );
};

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
