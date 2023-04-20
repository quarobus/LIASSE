import React from "react";
import "./app.scss";
import "../node_modules/bootstrap";
import HomePage from "./Pages/HomePage";
import PostFormPage from "./Pages/PostFormPage";
import AllBlogPage from "./Pages/AllBlogPage";

import { BrowserRouter , Routes , Route } from 'react-router-dom';


const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/PostForm" element={<PostFormPage/>} />
        <Route path="/Blogs" element={<AllBlogPage/>} />
       </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
