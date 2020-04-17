import React, { forwardRef, useRef, useEffect, memo } from "react";

import Scroll from "../scroll/index";
import PropTypes from "prop-types";
import { List, ListItem } from "./style";

const Horizen = forwardRef((props, ref) => {
  const { list, oldVal, title } = props;
  const { handleClick } = props;
  const Category = useRef();
  useEffect(() => {
    // 给滚动条设置长度，不然无法出现滚动效果
    let categoryDOM = Category.current;
    let tagElems = categoryDOM.querySelectorAll("span");
    let totalWidth = 0;
    Array.from(tagElems).forEach((ele) => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);
  // 子项点击事件,将执行父级给的事件
  const itemClick = (item) => {
    handleClick&&handleClick(item.key);
  };
  return (
    <Scroll direction="horizental">
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {list.map((item, index) => {
            return (
              <ListItem
                key={item.key}
                className={`${oldVal === item.key ? "selected" : ""}`}
                onClick={() => itemClick(item)}
              >
                {item.name}
              </ListItem>
            );
          })}
        </List>
      </div>
    </Scroll>
  );
});
// 首先考虑接受的参数
//list 为接受的列表数据
//oldVal 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法
Horizen.defaultProps = {
  list: [],
  oldVal: "",
  title: "",
  handleClick: null,
};

Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
};
export default memo(Horizen);
