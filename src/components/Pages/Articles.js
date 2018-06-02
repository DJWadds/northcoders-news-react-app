import React, { Component } from 'react';
import axios from'axios';
import Article from '../Generic/Article';
import '../../css/articles.css';

class Articles extends Component {
componentDidUpdate (prevrops) {
  if(prevrops.match.params.id !== this.props.match.params.id) {
    if (this.props.match.path.includes('topics')) {
      this.fetchArticlesByTopic(this.props.match.params.id);
    } else {
      this.fetchArticles();
    }
  } 
}
componentDidMount () {
  if (this.props.match.path.includes('topics')) {
    this.fetchArticlesByTopic(this.props.match.params.id);
  } else {
    this.fetchArticles();
  } 
}
  state = {
    articles: [],
    title: 'Waiting For Data'
  }
  render() {
    const {title, articles} = this.state;
    const {articleVote} = this;
    const {loggedinUser} = this.props;
    return ( 
    <section id="articles">
        <h1> {title} </h1>
        <div id="articlesItems">
          {articles.map((article, index) => {
            return <Article article={article} key={article._id} topicIndex={'na'} articleIndex={index} articleVote={articleVote} loggedinUser={loggedinUser}/>
          })}
        </div>
    </section>
    );
  }

  fetchArticles = (id) => {
    axios.get('https://northcoders-news-app-djwadds.herokuapp.com/api/articles')
    .then(({data: {articles}}) => {
      const title = 'Articles'
      this.setState({articles, title})
    })
  }

  fetchArticlesByTopic = (id) => {
    axios.get(`https://northcoders-news-app-djwadds.herokuapp.com/api/topics/${id}/articles`)
    .then(({data: {articles}}) => {
      const topics = this.props.topics;
      const [topic] = topics.filter(topic => topic._id === id);
      const title = topic.title;
      this.setState({articles, title});
    })
  }

  // FUNCTION ALLOWS VOTES ON ON ARTICLES AND IS PASSED DOWN TO EACH ARTICLE TO ALLOW RERENDERING
  articleVote = (vote, id, topicIndex, articleIndex) => {
    axios.put(`https://northcoders-news-app-djwadds.herokuapp.com/api/articles/${id}/${this.props.loggedinUser._id}?vote=${vote}`)
    .then(({data: {article}}) => {
      const articles = this.state.articles
      articles[articleIndex].likes = article.likes
      articles[articleIndex].dislikes = article.dislikes
      this.setState({articles})
    })
  }
}

export default Articles;