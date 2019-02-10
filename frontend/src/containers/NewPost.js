import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAddPost } from '../actions/posts'
import NewPost from '../components/NewPost'

const mapDispatchToProps = (dispatch, ownProps) => ({
  addPost: post => {
    dispatch(handleAddPost(post))
    ownProps.history.push(`/${post.category}/${post.id}`)
  }
})

export default withRouter(connect(null, mapDispatchToProps)(NewPost))
