import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Link  } from 'react-router-dom'
import PropTypes from 'prop-types'
import { handleInitialData } from '../actions/shared'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import Header from './Header'
import PostsList from './PostsList'
import PostPage from './PostPage'
import NewPost from './NewPost'
import EditPost from './EditPost'
import EditComment from './EditComment'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Header />
          <div className="container">
            <Route path="/" exact component={PostsList} />
            <Route path="/:category" exact component={PostsList} />
            <Route path="/:category/:id" component={PostPage} />
            <Route path="/add" component={NewPost} />
            <Route path="/edit/:id" component={EditPost} />
            <Route path="/comment/:id" component={EditComment} />
            <Link className="add" to="/add">
              <FontAwesomeIcon icon={faPencilAlt} />
            </Link>
          </div>
        </Fragment>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func
}

export default connect()(App)
