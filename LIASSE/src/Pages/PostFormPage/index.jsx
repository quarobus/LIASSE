import React, { useState, useCallback, useEffect } from 'react'
import { Navbar , Posts , Sidebar} from '../../Components'


function PostFormPage() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => {
      setIsOpen((prev) => !prev);
    };
    useEffect(() => {
      document.body.style.backgroundColor = "#000000"; // set body background color to black
      return () => {
        document.body.style.backgroundColor = null; // reset body background color on unmount
      };
    }, []);
    return (
        <>
        {isOpen && <Sidebar isOpen={isOpen} toggle={toggle} />}
        <Navbar toggle={toggle} />
        <Posts />


        </>
    )
}

export default PostFormPage