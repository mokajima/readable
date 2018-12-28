import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
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
          <header className="header">
            <div className="header__inner">
              <Link className="logo" to="/">Readable</Link>
              <ul className="categories-list">
                {categories.map((category) => (
                  <li className="categories-list__item" key={category.name}>
                    <NavLink to={`/${category.path}`} activeStyle={{color: 'b40b43'}}>
                      {category.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </header>
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

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(App)
