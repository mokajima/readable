import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { handleDeletePost } from '../actions/shared'
import { handleUpPostVote, handleDownPostVote } from '../actions/posts'
import { formatDate } from '../utils/helpers'

class Post extends Component {
  handleDelete = (id) => {
    const { commentIds } = this.props

    this.props.dispatch(handleDeletePost(id, commentIds))
  }

  handleIncrement = (id) => {
    this.props.dispatch(handleUpPostVote(id))
  }

  handleDecrement = (id) => {
    this.props.dispatch(handleDownPostVote(id))
  }

  render() {
    const { post } = this.props

    return (
      <li>
        <p>{post.author}</p>
        <p>{formatDate(post.timestamp)}</p>
        <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
        <p>{post.commentCount}</p>
        <Link to={`/edit/${post.id}`}>Edit</Link>
        <p onClick={() => this.handleDelete(post.id)}>Delete</p>
        <p onClick={() => this.handleDecrement(post.id)}>-</p>
        <p>{post.voteScore}</p>
        <p onClick={() => this.handleIncrement(post.id)}>+</p>
      </li>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  commentIds: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
}

function mapStateToProps({ comments, posts }, { id }) {
  return {
    post: posts[id],
    commentIds: Object.keys(comments).filter((commentId) => comments[commentId].parentId === id)
  }
}

export default connect(mapStateToProps)(Post)
