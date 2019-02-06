import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '../utils/helpers'

class Comment extends Component {

  /**
   * @description Delete a comment
   */
  handleDelete = () => {
    const { deleteComment, comment } = this.props
    deleteComment(comment)
  }

  /**
   * @description Upvote a comment
   * @param {string} id - The ID of the comment
   */
  handleIncrement = (id) => {
    this.props.upCommentVote(id)
  }

  /**
   * @description Downvote a comment
   * @param {string} id - The ID of the comment
   */
  handleDecrement = (id) => {
    this.props.downCommentVote(id)
  }

  render() {
    const { comment } = this.props

    return (
      <article className="comment">
        <div>
          <p className="comment__author">{comment.author}</p>
          <p className="comment__date">{formatDate(comment.timestamp)}</p>
          <p>{comment.body}</p>
          <footer className="comment__footer">
            <Link to={`/comment/${comment.id}`}>Edit</Link>
            <p className="comment__delete" onClick={() => this.handleDelete(comment.id)}>Delete</p>
          </footer>
        </div>
        <div className="comment__votes">
          <p onClick={() => this.handleIncrement(comment.id)}>
            <FontAwesomeIcon icon={faAngleUp} size="2x" />
          </p>
          <p>{comment.voteScore}</p>
          <p onClick={() => this.handleDecrement(comment.id)}>
            <FontAwesomeIcon icon={faAngleDown} size="2x" />
          </p>
        </div>
      </article>
    )
  }
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  upCommentVote: PropTypes.func.isRequired,
  downCommentVote: PropTypes.func.isRequired
}

export default Comment
