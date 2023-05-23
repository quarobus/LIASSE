import React, { useState, useCallback, useEffect } from 'react';
import { Navbar, Home, Feature, Sidebar , Feature2 , Services, Service2,MyBlog,ProfileAdm,ProfileDoc,ProfileProf, Footer} from '../../Components';

function ProfileProfPage() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => {
      setIsOpen((prev) => !prev);
    };
  
    const styles = {
      backgroundColor: "#ffffff" 
    };
    useEffect(() => {
      document.body.style.backgroundColor = "white !important"; 
      return () => {
        document.body.style.backgroundColor = null; 
      };
    }, []);
    return (
      <>
      {isOpen && <Sidebar isOpen={isOpen} toggle={toggle} />}
      <Navbar toggle={toggle} bgColors={"white"}/>
      <ProfileProf/>
      <Footer />
      </>
    );
  }
  

export default ProfileProfPage;