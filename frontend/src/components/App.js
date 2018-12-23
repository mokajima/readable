import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
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
    const { categories } = this.props

    return (
      <BrowserRouter>
        <Fragment>
          <header>
            <Link to="/">Readable</Link>
            {categories.map((category) => (
              <Link to={`/${category.path}`} key={category.name}>
                {category.name}
              </Link>
            ))}
            <Link to="/add">Add</Link>
          </header>
          <Route path="/" exact component={PostsList} />
          <Route path="/:category" exact component={PostsList} />
          <Route path="/:category/:id" component={PostPage} />
          <Route path="/add" component={NewPost} />
          <Route path="/edit/:id" component={EditPost} />
          <Route path="/comment/:id" component={EditComment} />
        </Fragment>
      </BrowserRouter>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(App)
