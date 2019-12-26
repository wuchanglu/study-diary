import React from "react";
import { GlobalStyle } from "./style.js";
import { IconStyle } from "./assets/iconfont/iconfont";
import routes from "./routes/index.js";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config"; //renderRoutes 读取路由配置转化为 Route 标签
import { Provider } from "react-redux";
import store from "./store/index";
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <GlobalStyle></GlobalStyle>
          <IconStyle></IconStyle>
          {renderRoutes(routes)}
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
