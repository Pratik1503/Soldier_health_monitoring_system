import { useContext, useRef, useState } from "react";

import classes from "./AuthForm.module.css";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx=useContext(AuthContext);
  const navigate=useNavigate();

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    //add validation
    setIsLoading(true);
    let url ;
     if (isLogin) {
        url=
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBFhlIcbLlaHrOXTqvqOKYxBRfaADPAgY8"
      }
    else{
      url=
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBFhlIcbLlaHrOXTqvqOKYxBRfaADPAgY8";

    }

    const signUpHandler = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        setIsLoading(false);
        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          if (errorData && errorData.error && errorData.error.message) {
            throw new Error(errorData.error.message);
          } else {
            throw new Error("Something went wrong!");
          }
          //
        }

        const userData = await response.json();
        console.log(userData);

        //calculate expiration time so that after it user will logout 
        const expirationTime=new Date(new Date().getTime()+(+userData.expiresIn*1000))
        authCtx.login(userData.idToken,expirationTime.toISOString())
        alert("Successfully send the Data");
        
        navigate('/', { replace: true })

      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    signUpHandler();
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={inputEmailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={inputPasswordRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading ...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
