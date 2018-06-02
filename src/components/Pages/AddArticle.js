import React, { Component } from 'react';
import Button from '../Generic/Button';
import axios from'axios';
import Autocomplete from 'react-autocomplete';
import '../../css/addArticle.css';

class AddArticle extends Component {
    componentDidMount () {
        this.fetchTopics();
    }
    state = {
        topics: [],
        topic: "",
        title: "",
        body: ""
    }
    render() {
    const {topic, title, body, topics} = this.state;
    const {inputTitle, inputBody, addArticle} = this;

    return (
        <section id="addArticle">
            <Autocomplete id="autoInput"
                items={topics}
                shouldItemRender={(item, value) => item.slug.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.slug}
                renderItem={(item, highlighted) =>
                <div
                    key={item.key}
                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                >
                    {item.slug}
                </div>
                }
                value={topic}
                onChange={e => this.setState({ topic: e.target.value })}
                onSelect={value => this.setState({ topic : value })}
            />
            <input type="text" placeholder="input your title" onChange={inputTitle}value={title}/>
            <input type="text" placeholder="input your article body" onChange={inputBody} value={body}/>
            <Button text="Post" onClick={() => addArticle(topic, title, body)} /> 
        </section>
    );
    }
    inputTopic = (event) => {
        this.setState({topic : event.target.value})
    }

    inputTitle = (event) => {
        this.setState({title : event.target.value})
    }

    inputBody = (event) => {
        this.setState({body : event.target.value})
    }

    addArticle= (topicInput, titleInput, bodyInput) => {
        if (topicInput.length < 1 || titleInput.length < 1 || bodyInput.length < 1) {
            return null
        }
        const relatedTopic = this.props.topics.filter(topic => topicInput.toLowerCase() === topic.slug)
        if (relatedTopic.length < 1) {
            return null
        }
        const topicId = relatedTopic[0]._id
        if (topicId === undefined) {
            return null
        }
        axios.post(`https://northcoders-news-app-djwadds.herokuapp.com/api/topics/${topicId}/articles/${this.props.loggedinUser._id}`, {'title': titleInput, 'body': bodyInput, 'userId': this.props.loggedinUser._id})
        .then(({data: {article}}) => {
            // this.clearInput();
            this.props.history.push(`/articles/${article[0]._id}`)
        })
    }

    fetchTopics = () => {
        axios.get('https://northcoders-news-app-djwadds.herokuapp.com/api/topics')
        .then(({data: {topics}}) => {
          this.setState({topics})
        })
        .catch(err => err)
    }

    clearInput = ()=>{
        this.setState({
            topic: "",
            title: "",
            body: ""
        })
      }
}

export default AddArticle;
