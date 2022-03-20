import React from 'react';
import {Routes, Route,Outlet} from "react-router-dom";
import {Header} from "./Header";
import {Main} from "./Main";
import {Episode} from "./Episode";
import {Character} from "./Character";

function App() {
  return (
    <div className="panel is-primary">
        <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/episode/:id" element={<Episode/>}/>
        <Route path="/characters/:name" element={<Character/>}/>
      </Routes>
      <Outlet/>
    </div>
  );
}

export default App;
