import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/nav.css';

function Nav ({topics, loggedinUser}) {
  return <section id="nav">
        <div><NavLink to="/">Home</NavLink></div>
        <div><NavLink to="/articles">All Articles</NavLink></div>
        {topics.map(topic => {
          return <div key={topic._id}><NavLink to={`/topics/${topic._id}`}>{topic.title} Articles</NavLink></div>
        })}
        {loggedinUser ? 
          <div id="navLastLink"><NavLink to="/addArticle">Add Article</NavLink></div>
          : null}
  </section>
}

export default Nav;