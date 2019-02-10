import { connect } from 'react-redux'
import { handleDeleteComment } from '../actions/shared'
import { handleUpCommentVote, handleDownCommentVote } from '../actions/comments'
import Comment from '../components/Comment'

const mapStateToProps = ({ comments }, { id }) => ({
  comment: comments[id]
})

const mapDispatchToProps = dispatch => ({
  deleteComment: comment => {
    dispatch(handleDeleteComment(comment))
  },
  upCommentVote: id => {
    dispatch(handleUpCommentVote(id))
  },
  downCommentVote: id => {
    dispatch(handleDownCommentVote(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
