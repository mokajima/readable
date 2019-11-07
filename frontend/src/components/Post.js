import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

// util
import { formatDate } from '../utils/helpers'

const Post = ({ post, handleDeletePost, handleUpPostVote, handleDownPostVote }) => (
  <li className="posts-list__item post">
    <div>
      <Link className="post__title" to={`/${post.category}/${post.id}`}>
        {post.title}
      </Link>
      <p className="post__meta">
        <span className="post__author">{post.author}</span>
        <span className="post__date">{formatDate(post.timestamp)}</span>
      </p>
      <p>{post.body}</p>
      <div className="post__footer">
        <FontAwesomeIcon icon={faComment} />
        <p className="post__comment">{post.commentCount}</p>
        <Link className="post__edit" to={`/edit/${post.id}`}>
          Edit
        </Link>
        <p className="post__delete" onClick={() => handleDeletePost(post.id)}>Delete</p>
      </div>
    </div>
    <div className="post__votes">
      <p className="arrow" onClick={() => handleUpPostVote(post.id)}>
        <FontAwesomeIcon icon={faAngleUp} size="2x" />
      </p>
      <p>{post.voteScore}</p>
      <p className="arrow" onClick={() => handleDownPostVote(post.id)}>
        <FontAwesomeIcon icon={faAngleDown} size="2x" />
      </p>
    </div>
  </li>
)

Post.propTypes = {
  post: PropTypes.object.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleUpPostVote: PropTypes.func.isRequired,
  handleDownPostVote: PropTypes.func.isRequired
}

export default Post
