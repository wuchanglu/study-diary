import React from "react";
import Head from "./components/header";
// import { BrowserRouter as Router, ithRouter } from "react-router-dom";
import "./App.css";

import Diary from "./pages/Diary/index.js";

function App() {
  return (
    <div className="App">
      <Head></Head>
      {/* <Router> */}
        <Diary></Diary>
      {/* </Router> */}
    </div>
  );
}

export default App;
