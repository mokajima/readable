import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { deleteParentPost } from '../actions/comments'
import { deletePost, upPostVote, downPostVote } from '../actions/posts'
import Comment from './Comment'
import NewComment from './NewComment'

class PostPage extends Component {
  handleDelete = (id) => {
    const { commentIds } = this.props

    this.props.dispatch(deletePost(id))

    commentIds.map((commentId) => this.props.dispatch(deleteParentPost(commentId)))

    this.props.history.push('/')
  }

  handleIncrement = (id) => {
    this.props.dispatch(upPostVote(id))
  }

  handleDecrement = (id) => {
    this.props.dispatch(downPostVote(id))
  }

  render() {
    const { comments, post, commentIds } = this.props

    return post
      ? <article>
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
      : null
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
