import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

// util
import { formatDate } from '../utils/helpers'

const Comment = ({
  comment,
  handleDeleteComment,
  handleUpCommentVote,
  handleDownCommentVote
}) => (
  <article className="comment">
    <div>
      <p className="comment__author">{comment.author}</p>
      <p className="comment__date">{formatDate(comment.timestamp)}</p>
      <p>{comment.body}</p>
      <footer className="comment__footer">
        <Link to={`/comment/${comment.id}`}>Edit</Link>
        <p
          className="comment__delete"
          onClick={() => handleDeleteComment(comment)}
        >
          Delete
        </p>
      </footer>
    </div>
    <div className="comment__votes">
      <p onClick={() => handleUpCommentVote(comment.id)}>
        <FontAwesomeIcon icon={faAngleUp} size="2x" />
      </p>
      <p>{comment.voteScore}</p>
      <p onClick={() => handleDownCommentVote(comment.id)}>
        <FontAwesomeIcon icon={faAngleDown} size="2x" />
      </p>
    </div>
  </article>
)

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  handleUpCommentVote: PropTypes.func.isRequired,
  handleDownCommentVote: PropTypes.func.isRequired
}

export default Comment
