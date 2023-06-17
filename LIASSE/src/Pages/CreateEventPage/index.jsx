import React, { useState, useCallback, useEffect } from 'react'
import { Footer, Navbar , CreateEvent , Sidebar} from '../../Components'


function Create_Event() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => {
      setIsOpen((prev) => !prev);
    };
    useEffect(() => {
      document.title = "Créer un événement";
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
        <CreateEvent />
        <Footer />

        </>
    )
}

export default Create_Event