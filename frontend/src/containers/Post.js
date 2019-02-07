import { connect } from 'react-redux'
import { handleDeletePost } from '../actions/shared'
import { handleUpPostVote, handleDownPostVote } from '../actions/posts'
import Post from '../components/Post'

function mapStateToProps({ comments, posts }, { id }) {
  return {
    post: posts[id],
    commentIds: Object.keys(comments).filter((commentId) => comments[commentId].parentId === id)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: (id, commentIds) => {
      dispatch(handleDeletePost(id, commentIds))
    },
    upPostVote: id => {
      dispatch(handleUpPostVote(id))
    },
    downPostVote: id => {
      dispatch(handleDownPostVote(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
