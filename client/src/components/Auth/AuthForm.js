import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passInputRef.current.value;

    setIsLoading(true);

    //LOGIN
    if(isLogin) {
      fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res=>{
          setIsLoading(false);
          
          return res.json();
      }).then(data=>{
        if(data.error) throw new Error(data.error);
        console.log(data);
        localStorage.setItem('token', data.token);
        history.push('/');
      }).catch(err=>console.error(err.message));


    } 
    
    //SIGN IN
    else {
      fetch('/signin', {
        method: 'POST',
        body: JSON.stringify({
          name: Math.random().toString().slice(2, 6),
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res=>{
        setIsLoading(false);
          if(!res.ok){
            console.log('Something went wrong');
          }
          return res.json();
      }).then(data=>{
        if(data.error) throw new Error(data.error);
        console.log(data);
      }).catch(err=>{
        console.error(err);
        alert(err.message);
      });
    };
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={formSubmitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passInputRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p style={{color: 'white'}}>Laoading...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
