import { connect } from 'react-redux'
import { handleDeletePost } from '../actions/shared'
import { handleUpPostVote, handleDownPostVote } from '../actions/posts'
import Post from '../components/Post'

const mapStateToProps = ({ comments, posts }, { id }) => ({
  post: posts[id],
  commentIds: Object.keys(comments).filter((commentId) => comments[commentId].parentId === id)
})

const mapDispatchToProps = dispatch => ({
  deletePost: (id, commentIds) => {
    dispatch(handleDeletePost(id, commentIds))
  },
  upPostVote: id => {
    dispatch(handleUpPostVote(id))
  },
  downPostVote: id => {
    dispatch(handleDownPostVote(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
