import React, { Component } from 'react';
import axios from'axios';
import Article from '../Generic/Article';
import Comment from '../Generic/Comment';
import Button from '../Generic/Button';

class Comments extends Component {
    componentDidMount () {
        this.fetchArticleAndComments(this.props.match.params.id);
    }

    componentDidUpdate (prevrops) {
        if(prevrops.match.params.id !== this.props.match.params.id) {
            this.fetchArticleAndComments(this.props.match.params.id)
        }
    }
  state = {
    article: null,
    comments: [],
    newComment: ""
  }
  render() {
    const {article, comments, newComment} = this.state;
    const {articleVote, commentVote, deleteComment, updateComment, addComment} = this;
    const {loggedinUser} = this.props
    return ( 
    <section className="page">
        {article ? <Article article={article} key={article._id} topicIndex={'na'} articleIndex={'na'} articleVote={articleVote} loggedinUser={loggedinUser}/> : null}
        {comments.map((comment, index) => {
            return <Comment comment={comment} index={index} commentVote={commentVote}  key={comment._id} deleteComment={deleteComment} loggedinUser={loggedinUser}/>
        })}
        <div className="addComment">
        <input type="text" placeholder="Write comment here ....." onChange={updateComment} value={newComment}/>
        <Button text="Post" onClick={() => addComment(article._id, newComment, loggedinUser)} /> 
        </div>
    </section>
    );
  }

  fetchArticleAndComments = (id) => {
    axios.all([
        axios.get(`https://northcoders-news-app-djwadds.herokuapp.com/api/articles/${id}`),
        axios.get(`https://northcoders-news-app-djwadds.herokuapp.com/api/articles/${id}/comments`)
    ])
    .then(([{data: {articles}}, {data: {comments}}]) => {
        comments.sort(function(a, b) {
            return a.created_at - b.created_at;
        })
        this.setState({
            article : articles[0],
            comments
        })
    })
  }

  // FUNCTION ALLOWS VOTES ON ON ARTICLES AND IS PASSED DOWN TO EACH ARTICLE TO ALLOW RERENDERING
  articleVote = (vote, id, topicIndex, articleIndex) => {
    axios.put(`https://northcoders-news-app-djwadds.herokuapp.com/api/articles/${id}/${this.props.loggedinUser._id}?vote=${vote}`)
    .then(({data: {article}}) => {
      this.setState({article})
    })
  }

  commentVote = (vote, id, index) => {
    axios.put(`https://northcoders-news-app-djwadds.herokuapp.com/api/comments/${id}/${this.props.loggedinUser._id}?vote=${vote}`)
    .then(({data: {comment}}) => {
        let comments = this.state.comments;
        comments[index].likes = comment.likes;
        comments[index].dislikes = comment.dislikes;
        this.setState({comments})
    })
  }

  deleteComment = (id) => {
      console.log(id)
    axios.delete(`https://northcoders-news-app-djwadds.herokuapp.com/api/comments/${id}`)
    .then(data => {
        console.log(data)
    })
  }

  addComment = (id, newComment, user) => {
        axios.post(`https://northcoders-news-app-djwadds.herokuapp.com/api/articles/${id}/comments/${this.props.loggedinUser._id}`, {'body': newComment})
        .then(() => {
            this.fetchArticleAndComments(id)
            this.setState({newComment:""})
        })
  }

  updateComment = (event) => {
      this.setState({newComment : event.target.value})
  }
}

export default Comments;