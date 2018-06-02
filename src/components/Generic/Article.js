// ARTICLE CREATER WHICH IS SENT ARTICLE DETAILS AND GENERATES AND ARTICLE DIV
// NO SATE YET BUT WILL USED TO UPDATE WHEN A NEW ARTICLE IS ADDED BY ANOTHER USER

import React, { Component } from 'react';
import Button from '../Generic/Button';
import { NavLink } from 'react-router-dom';
import '../../css/article.css';

class Article extends Component {
    render() {
    const {article, topicIndex, articleIndex, articleVote, loggedinUser} = this.props
    
    return (
    <div className="article" >
        <div className="usernameCombo"> 
            <div className="statement"> created by: </div>
            <a href={`${article.created_by.avatar_url}`}><img src={`${article.created_by.avatar_url}`} alt="user logo" className="userLogo" /></a>
            <div className="articleUsername">{article.created_by.username}</div>
        </div>
        <h4><NavLink to={`/articles/${article._id}`}>{article.title}</NavLink> </h4>
        <p> {article.body} </p>
        <p> Topic: <NavLink to={`/topics/${article.belongs_to._id}`}>{article.belongs_to.title}</NavLink></p>
        <div className="articleBottom">
                <div className="articleComments"> <NavLink to={`/articles/${article._id}`}>Comments: {article.comments}</NavLink> </div>
            <div className="articleVotes"> 
                <div className="votesWord"> Votes: {article.likes.length - article.dislikes.length} </div>
                    {loggedinUser ? 
                        !article.likes.includes(loggedinUser._id) ? 
                            !article.dislikes.includes(loggedinUser._id) ? 
                                <div>
                                    <Button text="Like" onClick={() => articleVote('like', article._id, topicIndex, articleIndex)}/> 
                                    <Button text="Dislike" onClick={() => articleVote('dislike', article._id, topicIndex, articleIndex)}/> 
                                </div>
                            : <div> unliked </div>
                        : <div> Liked </div>
                    : null}
            </div>
        </div>
    </div>
    );
    }
}

export default Article;