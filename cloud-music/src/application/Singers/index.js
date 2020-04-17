import React, { useState, useEffect } from "react";
import Horizen from "../../baseUI/horizen-item";
import Scroll from "../../baseUI/scroll";
import Loading from "../../baseUI/loading";
// 图片懒加载
// 引入 forceCheck 方法
import LazyLoad, { forceCheck } from "react-lazyload";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer, ListContainer, List, ListItem } from "./style";

import { connect } from "react-redux";
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList,
} from "./store/actionCreators";

function Singers(props) {
  let [category, setCategory] = useState("");
  let [alpha, setAlpha] = useState("");
  // 分类点击事件
  let handleUpdateCategory = (val) => {
    setCategory(val);
    updateDispatch(val, alpha);
  };
  // 字母点击事件
  let handleUpdateAlpha = (val) => {
    setAlpha(val);
    updateDispatch(category, val);
  };
  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount,
  } = props;
  const {
    getHotSingerDispatch,
    updateDispatch,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch,
  } = props;
  const pullUp = () => {
    console.log("pullUp");
    pullUpRefreshDispatch(category, alpha, category === "", pageCount);
  };
  const pullDown = () => {
    console.log("pullDown");
    pullDownRefreshDispatch(category, alpha);
  };
  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类 (默认热门):"}
        oldVal={category}
        handleClick={handleUpdateCategory}
      ></Horizen>
      <Horizen
        list={alphaTypes}
        title={"首字母:"}
        oldVal={alpha}
        handleClick={handleUpdateAlpha}
      ></Horizen>
      <ListContainer>
        <Scroll
          onScroll={forceCheck}
          pullUp={pullUp}
          pullDown={pullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          {renderSingerList(singerList.toJS())}
        </Scroll>
        {enterLoading ? <Loading></Loading> : ""}
      </ListContainer>
    </NavContainer>
  );
}

const renderSingerList = (list) => {
  return (
    <List>
      {list.map((item, index) => {
        return (
          <ListItem key={item.accountId + "" + index}>
            <div className="img_wrapper">
              <LazyLoad
                placeholder={
                  <img
                    width="100%"
                    height="100%"
                    src={require("./singer.png")}
                    alt="music"
                  />
                }
              >
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
              </LazyLoad>
            </div>
            <span className="name">{item.name}</span>
          </ListItem>
        );
      })}
    </List>
  );
};
const mapStateToProps = (state, ownProps) => ({
  singerList: state.getIn(["singers", "singerList"]),
  enterLoading: state.getIn(["singers", "enterLoading"]), //控制进场Loading
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]), //控制上拉加载动画
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]), //控制下拉加载动画
  pageCount: state.getIn(["singers", "pageCount"]), //这里是当前页数，我们即将实现分页功能
});
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0)); //由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true)); //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0)); //属于重新获取数据
      if (category === "" && alpha === "") {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
