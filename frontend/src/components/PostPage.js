import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Link, withRouter } from 'react-router-dom'
import { handleDeletePost } from '../actions/shared'
import { handleUpPostVote, handleDownPostVote } from '../actions/posts'
import { formatDate } from '../utils/helpers'
import Comment from './Comment'
import NewComment from './NewComment'

class PostPage extends Component {

  /**
   * @description Delete a post
   * @params {string} id - The ID of the post
   */
  handleDelete = (id) => {
    const { commentIds } = this.props

    this.props.dispatch(handleDeletePost(id, commentIds))

    this.props.history.push('/')
  }

  /**
   * @description Upvote a post
   * @params {string} id - The ID of the post
   */
  handleIncrement = (id) => {
    this.props.dispatch(handleUpPostVote(id))
  }

  /**
   * @description Downvote a post
   * @params {string} id - The ID of the post
   */
  handleDecrement = (id) => {
    this.props.dispatch(handleDownPostVote(id))
  }

  render() {
    const { comments, post, commentIds } = this.props

    if (post === null) {
      return null
    }

    if (post.deleted) {
      return (
        <div style={{textAlign: 'center'}}>
          <p>Oops, the page cannot be found X(</p>
          <Link className="button" to="/">Return to Home Page</Link>
        </div>
      )

    }

    return (
      <article className="entry">
        <div className="entry__inner">
          <div>
            <header>
              <h1 className="entry__title">
                <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
              </h1>
              <p className="entry__meta">
                <span className="post__author">{post.author}</span>
                <span className="post__date">{formatDate(post.timestamp)}</span>
              </p>
            </header>
            <p>{post.body}</p>
            <footer className="entry__footer">
              <FontAwesomeIcon icon={faComment} />
              <p className="entry__comment">{post.commentCount}</p>
              <Link className="entry__edit" to={`/edit/${post.id}`}>Edit</Link>
              <p className="entry__delete" onClick={() => this.handleDelete(post.id)}>Delete</p>
            </footer>
          </div>
          <div className="entry__votes">
            <p className="arrow" onClick={() => this.handleIncrement(post.id)}>
              <FontAwesomeIcon icon={faAngleUp} size="2x" />
            </p>
            <p>{post.voteScore}</p>
            <p className="arrow" onClick={() => this.handleDecrement(post.id)}>
              <FontAwesomeIcon icon={faAngleDown} size="2x" />
            </p>
          </div>
        </div>

        <section className="comments">
          <h2 className="comments__title">Comments</h2>
          {commentIds.map((id) => comments[id].deleted ? null : <Comment id={id} key={id} />)}
        </section>

        <NewComment parentId={post.id} />
      </article>
    )
  }
}

PostPage.propTypes = {
  comments: PropTypes.object.isRequired,
  post: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  commentIds: PropTypes.array.isRequired,
  dispatch: PropTypes.func,
  history: PropTypes.object
}

function mapStateToProps({ comments, posts }, props) {
  const { category, id } = props.match.params

  return {
    comments,
    post: posts[id] && posts[id].category === category ? posts[id] : null,
    commentIds: Object.keys(comments).filter((commentId) => comments[commentId].parentId === id)
  }
}

export default withRouter(connect(mapStateToProps)(PostPage))
