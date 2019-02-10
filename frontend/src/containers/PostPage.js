import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleDeletePost } from '../actions/shared'
import { handleUpPostVote, handleDownPostVote } from '../actions/posts'
import PostPage from '../components/PostPage'

const mapStateToProps = ({ comments, posts }, ownProps) => {
  const { category, id } = ownProps.match.params

  return {
    comments,
    post: posts[id] && posts[id].category === category ? posts[id] : null,
    commentIds: Object.keys(comments).filter((commentId) => comments[commentId].parentId === id)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  deletePost: (id, commentIds) => {
    dispatch(handleDeletePost(id, commentIds))
    ownProps.history.push('/')
  },
  upPostVote: id => {
    dispatch(handleUpPostVote(id))
  },
  downPostVote: id => {
    dispatch(handleDownPostVote(id))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostPage))
