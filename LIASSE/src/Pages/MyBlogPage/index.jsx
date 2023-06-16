import React, { useState, useCallback, useEffect } from 'react';
import { ADMNavbar, Home, Feature, Sidebar , Feature2 , Services, Service2,MyBlog, Footer } from '../../Components';

function MyBlogPage() {
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
        <ADMNavbar toggle={toggle} bgColors={"white"}/>
        <MyBlog/>
        <Footer />
      </>
    );
  }
  

export default MyBlogPage;