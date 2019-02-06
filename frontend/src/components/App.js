import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { handleInitialData } from '../actions/shared'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import Header from '../containers/Header'
import PostsList from '../containers/PostsList'
import PostPage from '../containers/PostPage'
import NewPost from '../containers/NewPost'
import EditPost from '../containers/EditPost'
import EditComment from '../containers/EditComment'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Helmet>
            <title>Readable</title>
          </Helmet>
          <Header />
          <div className="container">
            <Switch>
              <Route path="/" exact component={PostsList} />
              <Route path="/add" component={NewPost} />
              <Route path="/edit/:id" component={EditPost} />
              <Route path="/comment/:id" component={EditComment} />
              <Route path="/:category" exact component={PostsList} />
              <Route path="/:category/:id" component={PostPage} />
            </Switch>
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
