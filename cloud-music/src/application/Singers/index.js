import React, { useState } from "react";
import Horizen from "../../baseUI/horizen-item";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer } from "./style";
function Singers(props) {
  let [category, setCategory] = useState("");
  let [alpha, setAlpha] = useState("");
  // 分类点击事件
  let handleUpdateCategory = (val) => {
    setCategory(val);
  };
  // 字母点击事件
  let handleUpdateAlpha = (val) => {
    setAlpha(val);
  };
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
    </NavContainer>
  );
}

export default React.memo(Singers);
