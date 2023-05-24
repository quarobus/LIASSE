import React, { useState, useCallback, useEffect } from 'react'
import { Footer, Navbar , FormUser , Sidebar} from '../../components'


function FormPostLogin() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => {
      setIsOpen((prev) => !prev);
    };
    useEffect(() => {
      document.body.style.backgroundColor = "#ffffff"; // set body background color to black
      return () => {
        document.body.style.backgroundColor = null; // reset body background color on unmount
      };
    }, []);
    return (
        <>
        {isOpen && <Sidebar isOpen={isOpen} toggle={toggle} />}
        <Navbar toggle={toggle} bgColors={"white"}/>
        <FormUser />
        <Footer />

        </>
    )
}

export default FormPostLogin