import { LOGO_URL } from "../utils/constant";
import { useState,useEffect } from "react";

const Header = ()=>{

    const [btnName,setBtnName] = useState("LogIn");

    return (
      <div className="header">
        <div className="logo-container">
          <img src={LOGO_URL} className="logo"></img>
        </div>
  
        <div className="nav-menu">
          <ul >
            <li>Home</li>
            <li>About Us</li>
            <li>Contact US</li>
            <li>Cart</li>
            <li><button className="log-in" onClick={()=>{btnName==="LogIn"?setBtnName("LogOut"):setBtnName("LogIn")}}>{btnName}</button></li>
          </ul> 
  
        </div>
  
      </div>
    )
  }

  export default Header;
