import { connect } from 'react-redux'
import { handleDeleteComment } from '../actions/shared'
import { handleUpCommentVote, handleDownCommentVote } from '../actions/comments'
import Comment from '../components/Comment'

function mapStateToProps({ comments }, { id }) {
  return {
    comment: comments[id]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: comment => {
      dispatch(handleDeleteComment(comment))
    },
    upCommentVote: id => {
      dispatch(handleUpCommentVote(id))
    },
    downCommentVote: id => {
      dispatch(handleDownCommentVote(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
