
import { NavLink, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from 'react-icons/rx';
import React, { useContext, useState } from 'react';
import './Navbar.css';
import AuthContext from "../store/auth-context";


const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const authCtx=useContext(AuthContext);
    const isLoggedIn=authCtx.isLoggedIn;
    const navigate=useNavigate();
    
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);

    };

    const logoutHandler=()=>{
      authCtx.logout();
      navigate('/',{replace:true})
    }


  return (

    
   <>
    <header>
        <div className="logo">
           <NavLink to="/">
           <span> Soldier Monitoring System</span>
           </NavLink>
        </div>
        <nav className={isMenuOpen ? 'hamburger_menu_active' : 'hide-menu'} id="nav-bar"> 

        {!isLoggedIn && <NavLink to="/auth">Login</NavLink>}
        {isLoggedIn &&  <NavLink to="/">Home</NavLink>}
        {isLoggedIn && <NavLink to="/about">About</NavLink>}
        {isLoggedIn && <NavLink to="/checkhealth">Generate</NavLink>}
        {isLoggedIn && <NavLink to="/mapcontainer">Map</NavLink>}
        {isLoggedIn && <NavLink to="/contact">Contact</NavLink>}
        {isLoggedIn && 
            <button onClick={logoutHandler}>Logout</button>
        }
        
        </nav>

        <button className="hamburger" id="responsive2" onClick={toggleMenu}>         
           <RxHamburgerMenu/>
        </button>
    </header>



   
   </>
  )
}

export default Navbar;