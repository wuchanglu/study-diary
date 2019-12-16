import React from "react";
import Head from "./components/header";
import "./App.css";

import Diary from "./pages/Diary/index.js"

function App() {
  return (
    <div className="App">
      <Head></Head>
      <Diary></Diary>
    </div>
  );
}

export default App;
