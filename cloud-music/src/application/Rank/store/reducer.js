import * as actionTypes from "./constans.js";
import { fromJS } from "immutable";
// 生成初始值
const defaultState = fromJS({
  officialRank: [],
  globalRank: [],
  enterLoading: true,
});
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_OFFICIAL_RANK:
      return state.set("officialRank", action.data);
    case actionTypes.CHANGE_GLOBAL_RANK:
      return state.set("globalRank", action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set("enterLoading", action.data);
    default:
      return state;
  }
};
