import React from "react";
import "./app.scss";
import "../node_modules/bootstrap";
import HomePage from "./Pages/HomePage";
import PostFormPage from "./Pages/PostFormPage";
import AllBlogPage from "./Pages/AllBlogPage";
import MyBlogPage from "./Pages/MyBlogPage";
import ProfileAdmPage from "./Pages/ProfileAdmPage";
import ProfileDocPage from "./Pages/ProfileDocPage";
import ProfileProfPage from "./Pages/ProfileProfPage";
import FacultyPage from "./Pages/FacultyPage";
import GestionPage  from "./Pages/GestionAdminPage";
import FormPostLogin from "./Pages/FormPostLogin";
import EventPage from "./Pages/Eventpage";

import { BrowserRouter , Routes , Route } from 'react-router-dom';


const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/PostForm" element={<PostFormPage/>}/>
        <Route path="/Blogs" element={<AllBlogPage/>}/>
        <Route path="/MyBlogs" element={<MyBlogPage/>}/>
        <Route path="/PfAdm" element={<ProfileAdmPage/>}/>
        <Route path="/PfDoc" element={<ProfileDocPage/>}/>
        <Route path="/PfProf" element={<ProfileProfPage/>}/>
        <Route path="/Faculty" element={<FacultyPage/>}/>
        <Route path="/GestionAdmin" element={<GestionPage/>}/>
        <Route path="/CompleteProfil" element={<FormPostLogin/>}/>
        <Route path="/event" element={<EventPage/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
