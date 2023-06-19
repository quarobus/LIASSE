import React,{useState,useEffect} from 'react';
import { ADMNavbar,ADMSidebar,Gestionadmin,Footer } from '../../Components';
import '../../app.scss';

function GestionAdminPage() {
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
        {/* if there is any problme with footer position add app to make the footer at the bottom */}
        <div className="app">
        <ADMNavbar  toggle={toggle} bgColors={"white"} />
        <Gestionadmin/>
        <Footer />
        </div>
        </>
    )
}

export default GestionAdminPage