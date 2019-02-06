import { connect } from 'react-redux'
import PostForm from '../components/PostForm'

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(PostForm)
