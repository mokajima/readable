import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { handleUpCommentVote, handleDownCommentVote } from '../actions/comments'
import { handleDeleteComment } from '../actions/shared'

class Comment extends Component {
  handleDelete = (id) => {
    const { comment } = this.props

    this.props.dispatch(handleDeleteComment(comment))
  }

  handleIncrement = (id) => {
    this.props.dispatch(handleUpCommentVote(id))
  }

  handleDecrement = (id) => {
    this.props.dispatch(handleDownCommentVote(id))
  }

  render() {
    const { comment } = this.props

    return (
      <article>
        <p>{comment.author}</p>
        <p>{comment.body}</p>
        <Link to={`/comment/${comment.id}`}>Edit</Link>
        <p onClick={() => this.handleDelete(comment.id)}>Delete</p>
        <p onClick={() => this.handleDecrement(comment.id)}>-</p>
        <p>{comment.voteScore}</p>
        <p onClick={() => this.handleIncrement(comment.id)}>+</p>
      </article>
    )
  }
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired
}

function mapStateToProps({ comments }, { id }) {
  return {
    comment: comments[id]
  }
}

export default connect(mapStateToProps)(Comment)
