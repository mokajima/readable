import { connect } from 'react-redux'
import Header from '../components/Header'

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(Header)
