import { connect } from 'react-redux'
import { handleAddComment } from '../actions/shared'
import NewComment from '../components/NewComment'

const mapDispatchToProps = dispatch => ({
  addComment: comment => {
    dispatch(handleAddComment(comment))
  }
})

export default connect(null, mapDispatchToProps)(NewComment)
