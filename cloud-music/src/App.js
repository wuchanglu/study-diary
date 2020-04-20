import React from "react";
import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
import { renderRoutes } from "react-router-config";
import routes from "./routes/index.js";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

// 增加引入代码
import { Data } from "./application/Singers/data";
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>{renderRoutes(routes)}</Data>
      </HashRouter>
    </Provider>
  );
}

export default App;
