import { connect } from 'react-redux'
import PostsList from '../components/PostsList'

function mapStateToProps({ posts }, props) {
  const { category } = props.match.params

  const ids = category
    ? Object.keys(posts).filter((id) => posts[id].category === category)
    : Object.keys(posts)

  return {
    posts,
    ids,
    category
  }
}

export default connect(mapStateToProps)(PostsList)
