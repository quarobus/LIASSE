import React, { useState, useCallback, useEffect } from 'react';
import { ADMNavbar, Home, Feature, DocSidebar , Feature2 , Services, Service2 , Footer} from '../../Components';

function HomePage() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => {
      setIsOpen((prev) => !prev);
    };
  
    const styles = {
      backgroundColor: "white" 
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
      <ADMNavbar toggle={toggle} />
      <Home />
      <Feature />
      <Feature2 />
      <Services />
      <Service2 />
      <Footer />
      </>
    );
  }
  

export default HomePage;
