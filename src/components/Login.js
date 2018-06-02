import React, { Component } from 'react';
import Button from './Generic/Button';

class Login extends Component {
    state = {
        usernameInput: "",
        passwordInput: "",
        confirmPasswordInput: "",
        fullNameInput: "",
        avatarUrlInput: ""
    }
    render() {
        const {usernameInput, passwordInput, confirmPasswordInput, fullNameInput, avatarUrlInput} = this.state
        const {updateUser, updatePassword, updateConfirmPassword, updateFullName, updateAvatarUrl} = this
        const {login, register, registerUserDisplay, registerUser} = this.props
        return (
            <div id="login">
                <input id="username" type="text" placeholder="Input your username...." onChange={updateUser}/>
                <input id="password" type="password" placeholder="Input your password...." onChange={updatePassword}/>
                
                {register ? <div id="regiserForm">  
                    <input id="confirmPassword" type="password" placeholder="Comfirm your password...." onChange={updateConfirmPassword}/>
                    <input id="fullName" type="text" placeholder="Input your full name...." onChange={updateFullName}/>
                    <input id="avatarUrl" type="text" placeholder="Input your avatar Url lin...." onChange={updateAvatarUrl}/>
                    <div className="doubleButton">
                    <Button text="Register" onClick={() => registerUser(usernameInput, passwordInput, confirmPasswordInput, fullNameInput, avatarUrlInput)}/>
                    <Button text="Login" onClick={registerUserDisplay}/>
                    </div>
                </div> 
                : 
                <div className="doubleButton">
                <Button text="Login" onClick={() => login(usernameInput, passwordInput)}/>
                <Button text="Register" onClick={registerUserDisplay}/>
                </div>
                }    
            </div>
        )
    }

    updateUser = (event) => {
        this.setState({usernameInput : event.target.value})
    }

    updatePassword = (event) => {
        this.setState({passwordInput : event.target.value})
    }

    updateConfirmPassword = (event) => {
        this.setState({confirmPasswordInput : event.target.value})
    }

    updateFullName = (event) => {
        this.setState({fullNameInput : event.target.value})
    }

    updateAvatarUrl = (event) => {
        this.setState({avatarUrlInput : event.target.value})
    }

}

export default Login;