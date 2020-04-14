import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../application/Recommend/store/index";
// 合并reducer
export default combineReducers({
  recommend: recommendReducer,
});
