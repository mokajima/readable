import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { handleDeletePost } from '../actions/shared'
import { handleUpPostVote, handleDownPostVote } from '../actions/posts'
import Comment from './Comment'
import NewComment from './NewComment'

class PostPage extends Component {
  handleDelete = (id) => {
    const { commentIds } = this.props

    this.props.dispatch(handleDeletePost(id, commentIds))

    this.props.history.push('/')
  }

  handleIncrement = (id) => {
    this.props.dispatch(handleUpPostVote(id))
  }

  handleDecrement = (id) => {
    this.props.dispatch(handleDownPostVote(id))
  }

  render() {
    const { comments, post, commentIds } = this.props

    if (post === null) {
      return null;
    }

    if (post.deleted) {
      return <p>Oops, the page cannot be found.</p>
    }

    return (
      <article>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <p>{post.author}</p>
        <p>{post.commentCount}</p>
        <Link to={`/edit/${post.id}`}>Edit</Link>
        <p onClick={() => this.handleDelete(post.id)}>Delete</p>
        <p onClick={() => this.handleDecrement(post.id)}>-</p>
        <p>{post.voteScore}</p>
        <p onClick={() => this.handleIncrement(post.id)}>+</p>

        {commentIds.map((id) => comments[id].deleted ? null : <Comment id={id} key={id} />)}

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
  commentIds: PropTypes.array.isRequired
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
