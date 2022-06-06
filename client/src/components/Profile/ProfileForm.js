import classes from './ProfileForm.module.css';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const newPassInputRef = useRef();
  const formSubmitHandler = function(event){
    event.preventDefault();

    const enteredNewPass = newPassInputRef.current.value;

    fetch('/password', {
      method: 'PATCH',
      body: JSON.stringify({
        "newPassword": enteredNewPass
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then(res=>{
      return res.json();
    }).then(data=>{
      if(data.error) throw new Error(data.error);
      console.log(data);
      history.replace('/');
    }).catch(err=>{
      setError(true);
      console.error(err.message);
    })

  };
  return (
    <form onSubmit={formSubmitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPassInputRef} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
      {error && <p>Not Logged In</p>}
    </form>
  );
}

export default ProfileForm;
