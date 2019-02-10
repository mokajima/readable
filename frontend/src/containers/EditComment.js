import { connect } from 'react-redux'
import { handleEditComment } from '../actions/comments'
import EditComment from '../components/EditComment'

const mapStateToProps = ({ comments }, ownProps) => {
  const { id } = ownProps.match.params

  return {
    comment: comments[id]
  }
}

const mapDipatchToProps = dispatch => ({
  editComment: comment => {
    dispatch(handleEditComment(comment))
  }
})

export default connect(mapStateToProps, mapDipatchToProps)(EditComment)
