import { connect } from 'react-redux'
import { handleEditPost } from '../actions/posts'
import EditPost from '../components/EditPost'

function mapStateToProps({ posts }, props) {
  const { id } = props.match.params

  return {
    post: posts[id]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editPost: post => {
      dispatch(handleEditPost(post))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
