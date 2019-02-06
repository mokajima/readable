import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAddPost } from '../actions/posts'
import NewPost from '../components/NewPost'

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addPost: post => {
      dispatch(handleAddPost(post))
      ownProps.history.push(`/${post.category}/${post.id}`)
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(NewPost))
