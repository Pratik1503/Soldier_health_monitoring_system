import React, { useEffect, useState } from 'react';


let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime=(expirationTime)=>{
  let currentTime=new Date().getTime();
  const adjExpirationTime=new Date(expirationTime).getTime();

  const remainingTime=adjExpirationTime-currentTime;

  return remainingTime;
}

const retrieveStoredToken=()=>{
  const storedToken=localStorage.getItem('token');
  const storedExpirationDate=localStorage.getItem('expirationTime')

  const remainingTime=calculateRemainingTime(storedExpirationDate)

  if(storedExpirationDate<60000){
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }
  return {
    token:storedToken,
    duration:remainingTime
  }
}

export const AuthContextProvider = (props) => {
  const tokenData=retrieveStoredToken();
  let initialState;
  if(tokenData){
   initialState=tokenData.token;
  }
  const [token, setToken] = useState(initialState);

  const userIsLoggedIn = !!token;


  const loginHandler = (token,expirationTime) => {
    setToken(token);
    localStorage.setItem('token',token)
    localStorage.setItem('expirationTime',expirationTime);

    const remainingTime=calculateRemainingTime(expirationTime);

    //user should logout after remainingTime automatically;
    logoutTimer=setTimeout(logoutHandler,remainingTime);
  };
  
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    if(logoutTimer){
      clearTimeout(logoutTimer);
    }
  };

  useEffect(()=>{
    if(tokenData){
      console.log(tokenData.duration);
      logoutTimer=setTimeout(logoutHandler,tokenData.duration);
    }
  },[tokenData])

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;