import React from 'react';
import {Link,Routes, Route,Outlet} from "react-router-dom";
import {Header} from "./Header";

function App() {
  return (
    <div className="panel is-primary">
        <Header/>
      <header>
        <Link className={"button"} to={"/"}>Main</Link>
        <Link className={"button"} to={"/second"}>Second</Link>
      </header>
      <Routes>
        <Route path="/" element={<>1</>}/>
        <Route path="/second" element={<>2</>}/>
      </Routes>
      <Outlet/>
    </div>
  );
}

export default App;
