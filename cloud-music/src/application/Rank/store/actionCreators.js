import { getRankListRequest } from "../../../api/request";
import {
  CHANGE_OFFICIAL_RANK,
  CHANGE_GLOBAL_RANK,
  CHANGE_ENTER_LOADING,
} from "./constans";
import { fromJS } from "immutable";
const changeOfficialRank = (data) => {
  return {
    type: CHANGE_OFFICIAL_RANK,
    data: fromJS(data),
  };
};
const changeGlobalRank = (data) => {
  return {
    type: CHANGE_GLOBAL_RANK,
    data: fromJS(data),
  };
};
const changeEnterloding = (data) => {
  return {
    type: CHANGE_ENTER_LOADING,
    data: data,
  };
};
export const getRank = () => {
  return (dispatch, getState) => {
    dispatch(changeEnterloding(true));
    getRankListRequest().then((res) => {
      if (res && res.list) {
        const { officialRank, globalRank } = filterRankList(res.list);
        dispatch(changeOfficialRank(officialRank));
        dispatch(changeGlobalRank(globalRank));
        dispatch(changeEnterloding(false));
      }
    });
  };
};
function filterRankList(list = []) {
  let officialRank = [];
  let globalRank = [];
  list = JSON.parse(JSON.stringify(list));
  list.forEach &&
    list.forEach((item, index) => {
      item.tracks && item.tracks.length
        ? officialRank.push(item)
        : globalRank.push(item);
    });
  return { officialRank, globalRank };
}
