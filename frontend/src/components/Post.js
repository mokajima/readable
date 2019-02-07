import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '../utils/helpers'

class Post extends Component {

  /**
   * @description Delete a post
   * @params {string} id - The ID of the post
   */
  handleDelete = (id) => {
    const { commentIds, deletePost } = this.props
    deletePost(id, commentIds)
  }

  /**
   * @description Upvote a post
   * @params {string} id - The ID of the post
   */
  handleIncrement = (id) => {
    this.props.upPostVote(id)
  }

  /**
   * @description Downvote a post
   * @params {string} id - The ID of the post
   */
  handleDecrement = (id) => {
    this.props.downPostVote(id)
  }

  render() {
    const { post } = this.props

    return (
      <li className="posts-list__item post">
        <div>
          <Link className="post__title" to={`/${post.category}/${post.id}`}>{post.title}</Link>
          <p className="post__meta">
            <span className="post__author">{post.author}</span>
            <span className="post__date">{formatDate(post.timestamp)}</span>
          </p>
          <p>{post.body}</p>
          <div className="post__footer">
            <FontAwesomeIcon icon={faComment} />
            <p className="post__comment">{post.commentCount}</p>
            <Link className="post__edit" to={`/edit/${post.id}`}>Edit</Link>
            <p className="post__delete" onClick={() => this.handleDelete(post.id)}>Delete</p>
          </div>
        </div>
        <div className="post__votes">
          <p className="arrow" onClick={() => this.handleIncrement(post.id)}>
            <FontAwesomeIcon icon={faAngleUp} size="2x" />
          </p>
          <p>{post.voteScore}</p>
          <p className="arrow" onClick={() => this.handleDecrement(post.id)}>
            <FontAwesomeIcon icon={faAngleDown} size="2x" />
          </p>
        </div>
      </li>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  commentIds: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  deletePost: PropTypes.func.isRequired,
  upPostVote: PropTypes.func.isRequired,
  downPostVote: PropTypes.func.isRequired
}

export default Post
