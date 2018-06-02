// COMMENT CREATER WHICH IS SENT ARTICLE COMMENT DETAILS AND GENERATES A COMMENT
// NO SATE YET BUT WILL USED TO UPDATE WHEN A NEW COMMENT IS ADDED BY ANOTHER USER

import React, { Component } from 'react';
import Button from '../Generic/Button';
import '../../css/comment.css';

class Comment extends Component {
    render() {
    const {comment, index, commentVote, deleteComment, loggedinUser} = this.props
    return (
        <div className="commentWithUser">
            <div className="comment">
                    <div className="commentText"> 
                        {comment.body}
                    </div>
                    <div className="commentUserDetails">
                        <img src={`${comment.created_by.avatar_url}`} alt="user avatar"/>
                        <p>{comment.created_by.username} </p>

                    </div>
                <div className="commentBottom">
                    <div className="commentVotes"> 
                        <div className="voteText"> Votes: {comment.likes.length - comment.dislikes.length} </div>
                        {loggedinUser ? 
                            !comment.likes.includes(loggedinUser._id) ? 
                                !comment.dislikes.includes(loggedinUser._id) ? 
                                    <div className="commentVoteButtons">
                                        <Button text="like" onClick={() => commentVote('like', comment._id, index)}/> 
                                        <Button text="unlike" onClick={() => commentVote('dislike', comment._id, index)}/> 
                                    </div>
                                : <div> unliked </div>
                            : <div> Liked </div>
                        : null}
                    </div>
                    <div className="deleteComment">
                        {loggedinUser ? 
                            loggedinUser._id === comment.created_by._id ?
                                <Button text="Delete" onClick={() => deleteComment(comment._id)} /> 
                            : null
                        : null}
                    </div>
                </div>
            </div>
        </div>
    );
    }
    
}

export default Comment;