import React from "react";
import "./app.scss";
import "../node_modules/bootstrap";
import HomePage from "./Pages/HomePage";
import PostFormPage from "./Pages/PostFormPage";
import AllBlogPage from "./Pages/AllBlogPage";
import MyBlogPage from "./Pages/MyBlogPage";
import ProfileAdmEditPage from "./Pages/ProfileAdmEditPage";
import ProfileDocEditPage from "./Pages/ProfileDocEditPage";
import ProfileProfEditPage from "./Pages/ProfileProfEditPage";
import ProfileAdmShowPage from "./Pages/ProfileAdmShowPage";
import ProfileProfShowPage from "./Pages/ProfileProfShowPage";
import ProfileDocShowPage from "./Pages/ProfileDocShowPage";
import FacultyPage from "./Pages/FacultyPage";
import GestionPage  from "./Pages/GestionAdminPage";
import FormPostLogin from "./Pages/FormPostLogin";
import EventPage from "./Pages/Eventpage";
import Create_Event from "./Pages/CreateEventPage";

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

        <Route path="/PfAdmEdit" element={<ProfileAdmEditPage/>}/>
        <Route path="/PfAdmShow" element={<ProfileAdmShowPage/>}/>
        <Route path="/PfDocEdit" element={<ProfileDocEditPage/>}/>
        <Route path="/PfDocShow" element={<ProfileDocShowPage/>}/>
        <Route path="/PfProfEdit" element={<ProfileProfEditPage/>}/>
        <Route path="/PfProfShow" element={<ProfileProfShowPage/>}/>

        <Route path="/Faculty" element={<FacultyPage/>}/>
        <Route path="/GestionAdmin" element={<GestionPage/>}/>
        <Route path="/CompleteProfil" element={<FormPostLogin/>}/>
        <Route path="/event" element={<EventPage/>}/>
        <Route path="/create-event" element={<Create_Event/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
