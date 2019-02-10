import { connect } from 'react-redux'
import PostForm from '../components/PostForm'

const mapStateToProps = ({ categories }) => ({
  categories
})

export default connect(mapStateToProps)(PostForm)
