import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import { Button } from 'antd'
import './index.less'
import plus from './Plus.png'
import pic2 from './pic2.png'

ReactDOM.render(
  <h1>
    Hello, world!
    <img src={plus} />
    <img src={pic2} />
    <Button>Delete</Button>
  </h1>,
  document.getElementById('root')
)
console.log(555555)
