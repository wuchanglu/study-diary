//Album/index.js
import React, { useState, useEffect } from "react";
import { Container, Animation } from "./style";
// 先引入
import Header from "./../../baseUI/header/index";

function Album(props) {
  const [showStatus, setShowStatus] = useState(false);
  const [lockStatus, setLockStatus] = useState(true);
  const handleBack = () => {
    if (!lockStatus) {
      setShowStatus(false);
      setLockStatus(true);
      setTimeout(() => {
        props.history.goBack();
      }, 500);
    }
  };
  useEffect(() => {
    setShowStatus(true);
    setLockStatus(false);
  }, []);
  return (
    <Animation>
      <Container className={showStatus ? "show" : ""}>
        <Header title={"返回"} handleClick={handleBack}>
          wqcwqcwq
        </Header>
      </Container>
    </Animation>
  );
}

export default React.memo(Album);
