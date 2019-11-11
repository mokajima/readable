import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

// action
import { handleInitialData } from 'actions/shared'

// view
import Header from 'containers/Header'
import PostsList from 'containers/PostsList'
import PostPage from 'containers/PostPage'
import NewPost from 'containers/NewPost'
import EditPost from 'containers/EditPost'
import EditComment from 'containers/EditComment'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  return (
    <>
      <Helmet defaultTitle="Readable" titleTemplate="%s | Readable" />
      <BrowserRouter>
        <>
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
        </>
      </BrowserRouter>
    </>
  )
}

export default App
