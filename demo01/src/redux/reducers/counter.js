// counter.js
import { initialState } from "../store/index";

export default function counterReducer(state = initialState, action) {
  // console.log(state, 'counter')

  switch (action.type) {
    case "increase":
      return Object.assign({}, state, {
        count: state.count + 1
      });
    case "reduce":
      return Object.assign({}, state, {
        count: state.count - 1
      });
    case "sayHello":
      return Object.assign({}, state, {
        hello: state.hello + "hello! "
      });
    default:
      return state;
  }
}
