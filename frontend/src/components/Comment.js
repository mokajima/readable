import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteComment, upCommentVote, downCommentVote } from '../actions/comments'
import { deleteChildComment } from '../actions/posts'

class Comment extends Component {
  handleDelete = (id) => {
    const { comment } = this.props

    this.props.dispatch(deleteComment(id))
    this.props.dispatch(deleteChildComment(comment.parentId))
  }

  handleIncrement = (id) => {
    this.props.dispatch(upCommentVote(id))
  }

  handleDecrement = (id) => {
    this.props.dispatch(downCommentVote(id))
  }

  render() {
    const { comment } = this.props

    return (
      <article>
        <p>{comment.author}</p>
        <p>{comment.body}</p>
        <p>Edit</p>
        <p onClick={() => this.handleDelete(comment.id)}>Delete</p>
        <p onClick={() => this.handleDecrement(comment.id)}>-</p>
        <p>{comment.voteScore}</p>
        <p onClick={() => this.handleIncrement(comment.id)}>+</p>
      </article>
    )
  }
}

function mapStateToProps({ comments }, { id }) {
  return {
    comment: comments[id]
  }
}

export default connect(mapStateToProps)(Comment)
