import { AiOutlineClockCircle, AiFillCloud } from "react-icons/ai";
import { pic1,pic2,pic3 } from "../../assets";
import { SiGooglepodcasts } from "react-icons/si";

export const routes = [
  {
    name: "Home",
    path: "#",
  },
  {
    name: "How it works",
    path: "#how",
  },
  {
    name: "About Us",
    path: "#about",
  },
  {
    name: "Contact Us",
    path: "#contact",
  },
];

export const analytics = [
  {
    name: "Active users",
    desc: "12M",
  },
  {
    name: "Languages",
    desc: "16",
  },
  {
    name: "Support",
    desc: "24/7",
  },
];

export const features = [
  "Choose a view",
  "Meet your new butler",
  "Dive into the details",
  "Power up",
];

export const controls = [ 
  {
    name: "Innovative Projects",
    icon: pic2,
    description: "Discover and work on cutting-edge AI projects that tackle some of the biggest challenges facing society today.",
  },  
  {
    name: "Real-World Impact",
    icon: pic1,
    description : "Work on AI projects that have the potential to make a tangible impact on society and tackle real-world challenges.",
  },
  {
    name: "Expert Guidance",
    icon: pic3,
    description: "Receive mentorship and guidance from skilled AI experts who are enthusiastic about helping you enhance your skills.",
  },
];
