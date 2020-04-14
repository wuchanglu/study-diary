import * as actionTypes from "./constants";
import { fromJS } from "immutable"; // 将 JS 对象转换成 immutable 对象
import {
  getBannerRequest,
  getRecommendListRequest,
} from "../../../api/request";
// 提交action改变数据 banner
export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data),
});
// 提交action改变数据 list

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data),
});

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data: fromJS(data),
});

// 获取banner数据（调用了对应的action方法）
export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest()
      .then((data) => {
        dispatch(changeBannerList(data.banners));
      })
      .catch(() => {
        console.log("轮播图数据传输错误");
      });
  };
};
// 获取list数据（调用了对应的action方法）
export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest()
      .then((data) => {
        dispatch(changeRecommendList(data.result));
        setTimeout(() => {
          dispatch(changeEnterLoading(false));
        }, 500);
      })
      .catch(() => {
        console.log("推荐歌单数据传输错误");
      });
  };
};

export const setEnterLoading = (state) => {
  return (dispatch) => {
    dispatch(changeEnterLoading(state));
  };
};
