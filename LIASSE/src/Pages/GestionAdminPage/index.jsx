import React,{useState,useEffect} from 'react';
import axios from 'axios';
import CryptoJS from "crypto-js";
import { Navbar,Gestionadmin,Footer,Sidebar, ADMNavbar, ADMSidebar, ProfNavbar, ProfSidebar, DocNavbar, DocSidebar} from '../../components';
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
    function decryptData(encryptedData, key) {
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
      const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
      return decryptedText;
    }
    function getWithExpiry(key) {
      const itemString = localStorage.getItem(key);
      if (!itemString) {
        return null;
      }
      const item = JSON.parse(itemString);
      if (Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return decryptData(item.value, "LiasseEncryptionKey");
    }
    //GET email :
    const IsEmailNull = getWithExpiry("email") === null ;
    const email = !IsEmailNull ? getWithExpiry("email").replace(/"/g, '') : "";
    
    const [role, setRole] = useState("");
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:80/api/getRole.php?email=${encodeURIComponent(email)}`);
          console.log(email);
          if(IsEmailNull){
            console.log("no email present")
          }
          const result = response.data;
          if(email){
          setRole(result);
          }
          if (IsEmailNull) {
            setRole(null);
            console.log("null");
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [email]);

    const renderNavbar = () => {
      if (IsEmailNull) {
        return <Navbar toggle={toggle} bgColors={"white"}/>;
      } else if (role === "Prof") {
        return <ProfNavbar toggle={toggle}bgColors={"white"}  />;
      } else if (role === "Doc") {
        return <DocNavbar toggle={toggle} bgColors={"white"}/>;
      } else if (role === "Admin") {
        return <ADMNavbar toggle={toggle} bgColors={"white"}/>;
      } else {
        return null;
      }
    };
  
    const renderSidebar = () => {
      if (IsEmailNull) {
        return isOpen && <Sidebar isOpen={isOpen} toggle={toggle} />; // No sidebar for the default case
      } else if (role === "Prof") {
        return isOpen && <ProfSidebar isOpen={isOpen} toggle={toggle} />;
      } else if (role === "Doc") {
        return isOpen && <DocSidebar isOpen={isOpen} toggle={toggle}  />;
      } else if (role === "Admin") {
        return isOpen && <ADMSidebar isOpen={isOpen} toggle={toggle} />;
      } else {
        return null;
      }
    };
    return (
      <>
      {renderSidebar()}
        {/* if there is any problme with footer position add app to make the footer at the bottom */}
        <div className="app">
        {renderNavbar()}
        <Gestionadmin/>
        <Footer />
        </div>
        </>
    )
}

export default GestionAdminPage