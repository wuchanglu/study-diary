import styled from "styled-components";
import style from "../../assets/global-style";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: ${style["background-color"]};
  transform-origin: right bottom;
  transition: transform .5s;

  transform: rotatez(30deg) translate3d(100%,0,0);
`;
export const Animation = styled.div`
  .show {
    transform: rotateZ(0deg) translate3d(0,0,0);
  }
`;
