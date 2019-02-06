import { connect } from 'react-redux'
import { handleEditComment } from '../actions/comments'
import EditComment from '../components/EditComment'

function mapStateToProps({ comments }, props) {
  const { id } = props.match.params

  return {
    comment: comments[id]
  }
}

function mapDipatchToProps(dispatch) {
  return {
    editComment: comment => {
      dispatch(handleEditComment(comment))
    }
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(EditComment)
