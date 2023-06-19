import React,{useState,useEffect} from 'react';
import { Navbar,ProfSidebar,Gestionprof,Footer } from '../../Components';
import '../../app.scss';

function GestionProfPage() {
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
        {isOpen && <ProfSidebar isOpen={isOpen} toggle={toggle} />}
        {/* if there is any problme with footer position add app to make the footer at the bottom */}
        <div className="app">
        <Navbar  toggle={toggle} bgColors={"white"} />
        <Gestionprof/>
        <Footer />
        </div>
        </>
    )
}

export default GestionProfPage