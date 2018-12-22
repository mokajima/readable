import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePost, upPostVote, downPostVote } from '../actions/posts'
import { formatDate } from '../utils/helpers'

class Post extends Component {
  handleDelete = (id) => {
    this.props.dispatch(deletePost(id))
  }

  handleIncrement = (id) => {
    this.props.dispatch(upPostVote(id))
  }

  handleDecrement = (id) => {
    this.props.dispatch(downPostVote(id))
  }

  render() {
    const { post } = this.props

    return (
      <li>
        <p>{post.author}</p>
        <p>{formatDate(post.timestamp)}</p>
        <p>{post.title}</p>
        <p>{post.commentCount}</p>
        <p>Edit</p>
        <p onClick={() => this.handleDelete(post.id)}>Delete</p>
        <p onClick={() => this.handleDecrement(post.id)}>-</p>
        <p>{post.voteScore}</p>
        <p onClick={() => this.handleIncrement(post.id)}>+</p>
      </li>
    )
  }
}

function mapStateToProps({ posts }, { id }) {
  return {
    post: posts[id]
  }
}

export default connect(mapStateToProps)(Post)
