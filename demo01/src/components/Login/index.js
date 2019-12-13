import React from "react";
import "./index.scss";
import { Input,Button } from "element-react";

import "element-theme-default";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: ""
    };
  }
  render() {
    return (
      <div className="login">
        <div className="login__content">
          <p className="content__title">后台管理系统</p>
          <div className="content__form">
            <div className="form__header">
              <h3>Sign up now</h3>
              <p>Enter your username and password to log on:</p>
              <i className="el-icon-share"></i>
            </div>
            <div className="form__body">
              <Input className="body__input" size="large" icon="edit" placeholder="请输入账号" />
              <Input className="body__input" size="large" icon="setting" placeholder="请输入密码" />
              <Button type="primary">登录</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
