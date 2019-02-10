import { connect } from 'react-redux'
import Header from '../components/Header'

const mapStateToProps = ({ categories }) => ({
  categories
})

export default connect(mapStateToProps)(Header)
