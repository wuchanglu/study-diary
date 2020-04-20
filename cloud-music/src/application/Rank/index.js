import React, { useEffect } from "react";
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
  useEffect(() => {
    getRankData();
    // eslint-disable-next-line
  }, []);
  const displayStyle = enterLoading ? { display: "none" } : { display: "" };
  const pullDownHandle = () => {
    getRankData();
  };
  return (
    <Content>
      <Scroll pullDown={pullDownHandle}>
        <RankWrapper>
          <h1 className="offcial">官方榜</h1>
          <Offcial style={displayStyle} list={officialRank.toJS()}></Offcial>
          <h1 className="global">官方榜</h1>
          <Global style={displayStyle} list={globalRank.toJS()}></Global>
        </RankWrapper>
      </Scroll>
      {enterLoading ? <Loading></Loading> : ""}
    </Content>
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
  return (
    <OffcialWrapper>
      {list.map((item) => {
        return (
          <OffcialItem key={item.id}>
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
  return (
    <GlobalWrapper>
      {list.map((item) => {
        return (
          <GlobalItem key={item.id}>
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
