import { connect } from 'react-redux'
import { handleEditPost } from '../actions/posts'
import EditPost from '../components/EditPost'

const mapStateToProps = ({ posts }, ownProps) => {
  const { id } = ownProps.match.params

  return {
    post: posts[id]
  }
}

const mapDispatchToProps = dispatch => ({
  editPost: post => {
    dispatch(handleEditPost(post))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
