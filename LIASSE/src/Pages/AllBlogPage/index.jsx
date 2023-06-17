import React, { useState, useCallback, useEffect } from 'react';
import { ADMNavbar, Home, Feature, ADMSidebar , Feature2 , Services, Service2,BlogGenerale, Footer } from '../../Components';

function AllBlogPage() {
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
      {isOpen && <ADMSidebar isOpen={isOpen} toggle={toggle} />}
      <ADMNavbar toggle={toggle} bgColors={"white"} />
      <BlogGenerale/>
      <Footer />
      </>
    );
  }
  

export default AllBlogPage;