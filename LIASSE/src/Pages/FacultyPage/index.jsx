import React,{useState,useEffect} from 'react';
import { Navbar,Faculty,Footer } from '../../Components';

function FacultyPage() {
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
        {isOpen && <Sidebar isOpen={isOpen} toggle={toggle} />}
        <Navbar toggle={toggle} bgColors={"white"}/>
        <Faculty />
        <Footer />
        </>
    )
}

export default FacultyPage