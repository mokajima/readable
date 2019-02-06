import { connect } from 'react-redux'
import { handleAddComment } from '../actions/shared'
import NewComment from '../components/NewComment'

function mapDispatchToProps(dispatch) {
  return {
    addComment: comment => {
      dispatch(handleAddComment(comment))
    }
  }
}

export default connect(null, mapDispatchToProps)(NewComment)
