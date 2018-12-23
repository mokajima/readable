import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteParentPost } from '../actions/comments'
import { deletePost, upPostVote, downPostVote } from '../actions/posts'
import Comment from './Comment'
import NewComment from './NewComment'

class PostPage extends Component {
  handleDelete = (id) => {
    const { commentIds } = this.props

    this.props.dispatch(deletePost(id))

    commentIds.map((commentId) => this.props.dispatch(deleteParentPost(commentId)))
  }

  handleIncrement = (id) => {
    this.props.dispatch(upPostVote(id))
  }

  handleDecrement = (id) => {
    this.props.dispatch(downPostVote(id))
  }

  render() {
    const { comments, post, commentIds } = this.props

    return (
      <article>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <p>{post.author}</p>
        <p>{post.commentCount}</p>
        <p>Edit</p>
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

function mapStateToProps({ comments, posts }, { id }) {
  return {
    comments,
    post: posts[id],
    commentIds: Object.keys(comments).filter((commentId) => comments[commentId].parentId === id)
  }
}

export default connect(mapStateToProps)(PostPage)
