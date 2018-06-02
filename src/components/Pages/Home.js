// HOME PAGE CONTAINS 3 ARTICLES FROM EACH TOPIC
// STATE INCLUDES AN ARRAY OF ARRAYS OF ARTICLES FOR EACH TOPIC


import React, { Component } from 'react';
import axios from'axios';
import { NavLink } from 'react-router-dom';
import Article from '../Generic/Article';
import '../../css/home.css';

class Home extends Component {
  componentDidUpdate (preprops) {
    if(preprops.topics.length !== this.props.topics.length) {
      this.props.topics.forEach(topic => {
        this.fetchArticlesForTopics(topic)
      });
    } 
  }
  componentDidMount () {
      this.props.topics.forEach(topic => {
        this.fetchArticlesForTopics(topic)
      });
  }
  state = {
    articlesByTopic: []
  }
  render() {
    const {articlesByTopic} = this.state;
    const {articleVote} = this;
    const {loggedinUser} = this.props
    return ( 
    <section id="home">
      {articlesByTopic.map((articles, topicIndex) => {
        return <div className="articlesByTopic" key={articles[0].belongs_to._id}> 
          <h1> <NavLink to={`/topics/${articles[0].belongs_to._id} `}>{articles[0].belongs_to.title} </NavLink></h1>
          {articles.map((article, articleIndex) => {
            return <Article article={article} key={article._id} topicIndex={topicIndex} articleIndex={articleIndex} articleVote={articleVote} loggedinUser={loggedinUser}/>
          })}
        </div>
      })}
    </section>
    );
  }
// FUNCTION IS RUN ON ORIGONAL LOAD AND EVERYTIME THE HOME PAGE IS VISITED
// FUNCTION GETS ARTICLES BY TOPIC ID AND FILTERS OUT THE FIRST THREE SETTING THEM TO STATE
  fetchArticlesForTopics = (topic) => {
    axios.get(`https://northcoders-news-app-djwadds.herokuapp.com/api/topics/${topic._id}/articles`)
    .then(({data: {articles}}) => {
      const articlesToShow = []
      for (let i = 0; i < 3; i++) {
        if (articles[i] !== undefined) {
          articlesToShow.push(articles[i])
        }
      }
      const articlesByTopic = this.state.articlesByTopic
      articlesByTopic.push(articlesToShow)
      this.setState({articlesByTopic})
    })
  }
  
  // FUNCTION ALLOWS VOTES ON ON ARTICLES AND IS PASSED DOWN TO EACH ARTICLE TO ALLOW RERENDERING
  articleVote = (vote, id, topicIndex, articleIndex) => {
    axios.put(`https://northcoders-news-app-djwadds.herokuapp.com/api/articles/${id}/${this.props.loggedinUser._id}?vote=${vote}`)
    .then(({data: {article}}) => {
      const articlesByTopic = this.state.articlesByTopic
      articlesByTopic[topicIndex][articleIndex].likes = article.likes
      articlesByTopic[topicIndex][articleIndex].dislikes = article.dislikes
      this.setState({articlesByTopic})
    })
  }
}

export default Home;