import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from "./constants";
import { fromJS } from "immutable"; // 将 JS 对象转换成 immutable 对象
import { getAlbumDetailRequest } from "../../../api/request";

export const changeAlbum = (data) => ({
  type: CHANGE_CURRENT_ALBUM,
  data: fromJS(data),
});
export const changeEnterLoading = (data) => {
  return {
    type: CHANGE_ENTER_LOADING,
    data: fromJS(data),
  };
};
export const getAlbum = (id) => {
  return async (dispatch) => {
    dispatch(changeEnterLoading(true));
    const res = await getAlbumDetailRequest(id);
    console.log(res);
    if (res.code === 200) {
      dispatch(changeAlbum(res.playlist));
      dispatch(changeEnterLoading(false));
    }
  };
};
