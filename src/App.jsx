import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import CheckHealth from "./components/CheckHealth/CheckHealth";
import HealthTips from "./components/HealthTips/HealthTips";
import Contact from "./components/Contact/Contact";
import AuthContext from "./components/store/auth-context";
import AuthForm from "./components/Authentication/AuthForm";

const App = () => {
  const authCtx=useContext(AuthContext);
  const isLoggedIn=authCtx.isLoggedIn;
  return (
    <>
      <Navbar/> 

      <Routes>
      {(!isLoggedIn && <Route path='/auth' element={<AuthForm />}/>) || (isLoggedIn && <Route path='/' element={<Home />}/>)}
        {isLoggedIn && <Route  path="/"  exact element={<Home />} />}
        {isLoggedIn && <Route path="/about" element={<About/>} />}
        {isLoggedIn &&<Route path="/checkhealth" element={<CheckHealth/>} />}
        {isLoggedIn && <Route path="/healthtips" element={<HealthTips/>} />}
        {isLoggedIn && <Route path="/contact" element={<Contact/>} />}
      </Routes>

      {/* <Footer/>  */}
    </>
  );
};

export default App;
