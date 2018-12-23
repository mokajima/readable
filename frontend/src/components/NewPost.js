import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addPost } from '../actions/posts'
import { getId, getTimestamp } from '../utils/helpers'
import PostForm from './PostForm'

class NewPost extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: 'react'
  }

  isDisabled = () => {
    const { title, body, author, category } = this.state

    return '' === title.trim() || '' === body.trim() || '' === author.trim() || '' === category
  }

  handleChange = (e) => {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    const { title, body, author, category } = this.state
    const id = getId()

    this.props.dispatch(addPost({
      [id]: {
        id,
        timestamp: getTimestamp(),
        title: title.trim(),
        body: body.trim(),
        author: author.trim(),
        category,
        voteScore: 0,
        deleted: false,
        commentCount: 0
      }
    }))

    this.props.history.push(`/${category}/${id}`)
  }

  render() {
    const { title, body, author, category } = this.state

    return (
      <PostForm
        title={title}
        body={body}
        author={author}
        category={category}
        isDisabled={this.isDisabled}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(connect()(NewPost))
