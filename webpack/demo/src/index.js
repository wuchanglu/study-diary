import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import plus from "./Plus.png";
import pic2 from "./pic2.png";
import 'antd/dist/antd.css';
import {  Button } from 'antd';
ReactDOM.render(
  <h1>
    Hello, world!
    <img src={plus}></img>
    <img src={pic2}></img>
    <Button>Delete</Button>
  </h1>,
  document.getElementById("root")
);
