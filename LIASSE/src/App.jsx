import React, { useEffect , useState } from "react";
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
import GestionAdminPage  from "./Pages/GestionAdminPage";
import GestionProfPage from "./Pages/GestionProfPage";
import FormPostLogin from "./Pages/FormPostLogin";
import EventPage from "./Pages/Eventpage";
import Create_Event from "./Pages/CreateEventPage";
import { BrowserRouter , Routes , Route, Navigate } from 'react-router-dom';
import CryptoJS from "crypto-js";
import axios from "axios";


const App = () => {
  const [showGradeInput, setShowGradeInput] = useState(false);
  function decryptData(encryptedData, key) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }

function getWithExpiry(key) {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
      return null;
    }
    const item = JSON.parse(itemString);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return decryptData(item.value, "LiasseEncryptionKey");
  }
  //GET email :
  const IsEmailNull = getWithExpiry("email") === null ;
  const email = !IsEmailNull ? getWithExpiry("email").replace(/"/g, '') : "";
  
  const [role, setRole] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:80/api/getRole.php?email=${encodeURIComponent(email)}`);
        console.log(email);
        if(IsEmailNull){
          console.log("no email present")
        }
        const result = response.data;
        if(email){
        setRole(result);
        }
        if (IsEmailNull) {
          setRole(null);
          console.log("null");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [email]);

  return (
      <BrowserRouter>
      <Routes>
       <Route path="/" element={<HomePage />} />
          <Route path="/Blogs" element={<AllBlogPage />} />
          <Route path="/Faculty" element={<FacultyPage />} />
          <Route path="/event" element={<EventPage />} />
          {role === "Prof" && (
            <>
            <Route path="*" element={<Navigate to="/" />} />
              <Route path="/PostForm" element={<PostFormPage />} />
              <Route path="/MyBlogs" element={<MyBlogPage />} />
              <Route path="/PfProfEdit" element={<ProfileProfEditPage/>}/>
              <Route path="/PfProfShow" element={<ProfileProfShowPage/>}/>
              <Route path="/GestionAdmin" element={<GestionProfPage />} />
              <Route path="/CompleteProfil" element={<FormPostLogin />} />
              <Route path="/create-event" element={<Create_Event />} />
            </>
          )}
          {role === "Admin" && (
            <>
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/PostForm" element={<PostFormPage />} />
              <Route path="/MyBlogs" element={<MyBlogPage />} />
              <Route path="/PfAdmEdit" element={<ProfileAdmEditPage/>}/>
              <Route path="/PfAdmShow" element={<ProfileAdmShowPage/>}/>
              <Route path="/GestionAdmin" element={<GestionAdminPage />} />
              <Route path="/CompleteProfil" element={<FormPostLogin />} />
              <Route path="/create-event" element={<Create_Event />} />
            </>
          )}
          {role === "Doc" && (
            <>
              <Route path="/MyBlogs" element={<MyBlogPage />} />
              <Route path="/PfDocEdit" element={<ProfileDocEditPage/>}/>
              <Route path="/PfDocShow" element={<ProfileDocShowPage/>}/>
              <Route path="/CompleteProfil" element={<FormPostLogin />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
          {role === null && (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </BrowserRouter>
  );
};

export default App;
