import React from 'react';
import {Link,Routes, Route,Outlet} from "react-router-dom";
import {Header} from "./Header";
import {Main} from "./Main";
import {Episode} from "./Episode";

function App() {
  return (
    <div className="panel is-primary">
        <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/episode/:id" element={<Episode/>}/>
      </Routes>
      <Outlet/>
    </div>
  );
}

export default App;
