import React, { Component } from 'react';
import axios from'axios';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './css/main2.css';

import Header from './components/Header';
import Nav from './components/Nav';
// import Footer from './components/Footer';
import Home from './components/Pages/Home';
import Articles from './components/Pages/Articles';
import Comments from './components/Pages/Comments';
import AddArticle from './components/Pages/AddArticle';

class App extends Component {
  componentDidMount () {
    this.fetchTopics();
  }
  state = {
    loggedinUser: false,
    register: false,
    topics: []
  }
  render() {
    const {topics, loggedinUser, register} = this.state;
    const {login, logout, registerUserDisplay, registerUser} = this;
    return (
    <Router>
      <section id="app">
        <Header login={login} logout={logout} loggedinUser={loggedinUser} registerUserDisplay={registerUserDisplay} register={register} registerUser={registerUser}/>
        <Nav topics={topics} loggedinUser={loggedinUser}/>
        <Switch>
          <Route path="/articles/:id" render={(props) => <Comments {...props} topics={topics}  loggedinUser={loggedinUser}/>}/>
          <Route path="/articles" render={(props) => <Articles {...props} topics={topics} loggedinUser={loggedinUser}/>}/>
          <Route path="/topics/:id" render={(props) => <Articles {...props} topics={topics} loggedinUser={loggedinUser}/>}/>
          <Route path="/addArticle" render={(props) => <AddArticle {...props} topics={topics} loggedinUser={loggedinUser}/>}/>
          <Route path="/topics" render={() => <Home topics={topics} loggedinUser={loggedinUser}/>} />
          <Route exact path="/" render={() => <Home topics={topics} loggedinUser={loggedinUser}/>} />
          {/* <Route path="/" Component={NotFound} /> */}
        </Switch>
        {/* <Footer /> */}
      </section>
    </Router>
    );
  }
  fetchTopics = () => {
    axios.get('https://northcoders-news-app-djwadds.herokuapp.com/api/topics')
    .then(({data: {topics}}) => {
      this.setState({topics})
    })
    .catch(err => err)
  }

  login = (username, password) => {
    if (username.length < 1) {
      return alert('Please enter your username');
    }
    if (password.length < 1) {
      return alert('Please enter your password');
    }
    axios.get('https://northcoders-news-app-djwadds.herokuapp.com/api/users')
    .then(({data: {users}}) => {
      const [user] = users.filter(user => user.username === username)
      axios.get(`https://northcoders-news-app-djwadds.herokuapp.com/api/users/${user._id}/login?password=${password}`)
    .then(({data: {users}}) => {
      if (users === undefined) {
        return alert('Incorrect password')
      } else {
        const loggedinUser = users[0]
        this.setState({loggedinUser})
      }
    })
    .catch(() => alert('problem'))
    })
  }

  logout = () => {
    this.setState({loggedinUser : false})
  }

  registerUserDisplay = () => {
    const register = !this.state.register
    this.setState({register})
  }

  registerUser = (username, password, confirmPassword, fullName, avatarUrlInput) => {
    if (username.length < 1) {
      return alert('Please enter your username');
    }
    if (password.length < 1) {
      return alert('Please enter your password');
    }
    if (confirmPassword.length < 1) {
      return alert('Please confirm your password');
    }
    if (fullName.length < 1) {
      return alert('Please enter your fullName');
    }
    if (avatarUrlInput.length < 1) {
      return alert('Please enter your avatar link');
    }
    if (password !== confirmPassword) {
      return alert('Passwords did not match');
    }
    axios.get('https://northcoders-news-app-djwadds.herokuapp.com/api/users')
    .then(({data: {users}}) => {
      const usernameExists = users.filter(user => user.username === username)
      if (usernameExists.length !== 0) {
        return alert('Username alread exists')
      }
      axios.post('https://northcoders-news-app-djwadds.herokuapp.com/api/users', {username, password, 'name': fullName, 'avatar_url': avatarUrlInput})
      .then(({data}) => {
        this.setState({loggedinUser : data.user})
      })
    })
  }
}

export default App;
