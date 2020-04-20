import styled from "styled-components";
// eslint-disable-next-line
import style from "../../assets/global-style.js";
export const OffcialItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid rgb(228, 228, 228);
  & > .item-pic {
    width: 27vw;
    height: 27vw;
    position: relative;
    border-radius: 3px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .decorate {
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(
        rgba(255, 255, 255, 0),
        rgba(110, 110, 110, 0.4)
      );
    }
    .update_frequecy {
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: 10px;
      color: rgb(241, 241, 241);
    }
  }
  & > ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1 1 0%;
    box-sizing: border-box;
    height: 27vw;
    padding: 10px;
    li {
      font-size: 12px;
      color: grey;
    }
  }
`;
export const OffcialWrapper = styled.div`
  padding: 5px;
  margin-bottom: 10px;
`;
export const GlobalItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid rgb(228, 228, 228);
  & > .item-pic {
    width: 32vw;
    height: 32vw;
    position: relative;
    border-radius: 3px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .decorate {
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(
        rgba(255, 255, 255, 0),
        rgba(110, 110, 110, 0.4)
      );
    }
    .update_frequecy {
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: 10px;
      color: rgb(241, 241, 241);
    }
  }
`;
export const GlobalWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5px;
`;
export const RankWrapper = styled.div`
  h1 {
    padding-left: 5px;
  }
  .offcial {
    padding-top: 15px;
    font-weight: 700;
    font-size: 14px;
    color: rgb(46, 48, 48);
    margin: 10px 5px;
  }
  .global {
    padding-top: 15px;
    font-weight: 700;
    font-size: 14px;
    color: rgb(46, 48, 48);
    margin: 10px 5px;
  }
`;
export const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
`;
