import { createStore } from "redux";
import reducers from "./reducers";

import counterAction from "./actions/counter";
const store = createStore(reducers);
export default store;

const counter = {
  mapStateToProps: state => {
    // console.log(state, 123)
    return {
      count: state.counter.count
    };
  },
  mapDispatchToProps: dispatch => {
    return {
      onIncreaseClick: () => {
        dispatch(counterAction.increase);
      },
      onReduceClick: () => {
        dispatch(counterAction.reduce);
      }
    };
  }
};
// // Map Redux State to component props
// const mapStateToProps = ;
// // Map Redux actions to component props
// const mapDispatchToProps = ;
export { counter };
