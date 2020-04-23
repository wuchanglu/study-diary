import React, { useEffect, useCallback } from "react";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";
import { getRank } from "./store/actionCreators";
import Scroll from "../../baseUI/scroll";
import Loading from "../../baseUI/loading";
import {
  OffcialItem,
  OffcialWrapper,
  RankWrapper,
  GlobalWrapper,
  GlobalItem,
  Content,
} from "./style";
function Rank(props) {
  const { officialRank, globalRank, enterLoading } = props;
  const { getRankData } = props;
  const { route } = props;
  useEffect(() => {
    getRankData();
    // eslint-disable-next-line
  }, []);
  const displayStyle = enterLoading ? { display: "none" } : { display: "" };
  const pullDownHandle = useCallback(() => {
    getRankData();
    // eslint-disable-next-line
  }, []);
  const enterDetail = useCallback((detail) => {
    props.history.push(`/rank/${detail.id}`);
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Content>
        <Scroll pullDown={pullDownHandle}>
          <RankWrapper>
            <h1 className="offcial">官方榜</h1>
            <Offcial
              style={displayStyle}
              list={officialRank.toJS()}
              itemClick={enterDetail}
            ></Offcial>
            <h1 className="global">官方榜</h1>
            <Global
              style={displayStyle}
              list={globalRank.toJS()}
              itemClick={enterDetail}
            ></Global>
          </RankWrapper>
        </Scroll>
        {enterLoading ? <Loading></Loading> : ""}
      </Content>
      {renderRoutes(route.routes)}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    officialRank: state.getIn(["rank", "officialRank"]),
    globalRank: state.getIn(["rank", "globalRank"]),
    enterLoading: state.getIn(["rank", "enterLoading"]),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getRankData() {
      dispatch(getRank());
    },
  };
};
function Offcial(props) {
  const { list } = props;
  const { itemClick } = props;
  return (
    <OffcialWrapper>
      {list.map((item) => {
        return (
          <OffcialItem key={item.id} onClick={() => itemClick(item)}>
            <div className="item-pic">
              <img alt="" src={item.coverImgUrl}></img>
              <div className="decorate"></div>
              <span className="update_frequecy">{item.updateFrequency}</span>
            </div>
            <ul>
              {item.tracks.map((track, trackIndex) => {
                return (
                  <li key={trackIndex}>
                    {trackIndex + 1}. {track.first} - {track.second}
                  </li>
                );
              })}
            </ul>
          </OffcialItem>
        );
      })}
    </OffcialWrapper>
  );
}
function Global(props) {
  const { list } = props;
  const { itemClick } = props;

  return (
    <GlobalWrapper>
      {list.map((item) => {
        return (
          <GlobalItem key={item.id} onClick={() => itemClick(item)}>
            <div className="item-pic">
              <img alt="" src={item.coverImgUrl}></img>
              <div className="decorate"></div>
              <span className="update_frequecy">{item.updateFrequency}</span>
            </div>
          </GlobalItem>
        );
      })}
    </GlobalWrapper>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
