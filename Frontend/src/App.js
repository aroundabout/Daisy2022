import React from 'react'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div className="App">
      <Button type="primary"> antd按钮测试1 </Button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
