import React, { useState, useCallback, useEffect } from 'react'
import { Footer, Navbar , CoutainerEvent , Sidebar} from '../../Components'


function EventPage() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => {
      setIsOpen((prev) => !prev);
    };
    useEffect(() => {
      document.title = "les événements disponibles";
      document.body.style.backgroundColor = "#ffffff"; // set body background color to black
      return () => {
        document.title = "LIASSE";
        document.body.style.backgroundColor = null; // reset body background color on unmount
      };
    }, []);
    return (
        <>
        {isOpen && <Sidebar isOpen={isOpen} toggle={toggle} />}
        <Navbar toggle={toggle} bgColors={"white"}/>
        <CoutainerEvent />
        <Footer />

        </>
    )
}

export default EventPage