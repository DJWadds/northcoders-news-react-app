import React from 'react';
import Button from './Generic/Button';

function Loggedin ({loggedinUser, logout}) {
  return <div id="Loggedin">
      <a href={`${loggedinUser.avatar_url}`}><img src={`${loggedinUser.avatar_url}`} alt="user logo" id="loggedinUserLogo" /></a>
      <h3 id="loggedinUsername"> {loggedinUser.username} </h3>
    <Button text="LOGOUT"  onClick={logout}/>
  </div>
}

export default Loggedin;