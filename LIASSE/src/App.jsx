import React from "react";
import "./app.scss";
import HomePage from "./Pages/HomePage";
import PostFormPage from "./Pages/PostFormPage";
import { BrowserRouter , Routes , Route } from 'react-router-dom';


const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/PostForm" element={<PostFormPage/>} />
       </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
