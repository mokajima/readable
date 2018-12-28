import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
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
  id: PropTypes.string.isRequired
}

function mapStateToProps({ comments, posts }, { id }) {
  return {
    post: posts[id],
    commentIds: Object.keys(comments).filter((commentId) => comments[commentId].parentId === id)
  }
}

export default connect(mapStateToProps)(Post)
