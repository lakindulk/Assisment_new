import React from "react";
import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";
import Login from './screen/Login';
import Home from './screen/Home';
import Register from './screen/Register';
import CreatePost from "./screen/CreatePost";
import Viewpost from "./screen/Viewpost";



function App() {
  return (
    <BRouter>
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/post" element={<CreatePost />} />
      <Route exact path="/viewpost" element={<Viewpost />} />


      </Routes>
    </BRouter>
  );
}

export default App;
