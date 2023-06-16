import React, { useState, useCallback, useEffect } from 'react'
import { Footer, ADMNavbar , Posts , Sidebar} from '../../Components'


function PostFormPage() {
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
        <ADMNavbar toggle={toggle} bgColors={"white"}/>
        <Posts />
        <Footer />

        </>
    )
}

export default PostFormPage