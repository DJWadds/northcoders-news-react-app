import React from 'react';
import Login from './Login';
import Loggedin from './Loggedin';
import '../css/header.css';

function Header ({login, logout, loggedinUser, registerUserDisplay, register, registerUser}) {
  return <section id="header">
    <div id="headerItems">
      <img src="/img/northcoderLogo.png" alt="Northcoder logo" id="headerLogo" />
      <h1> Northcoder News </h1>
    </div>
    <div id="loginStatus">
        {loggedinUser ? 
            <Loggedin loggedinUser={loggedinUser} logout={logout}/>
            : <Login login={login} registerUserDisplay={registerUserDisplay} register={register} registerUser={registerUser}/>
        }
    </div>
  </section>
}

export default Header;