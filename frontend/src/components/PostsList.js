import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Post from './Post'

class PostsList extends Component {
  state = {
    sort: 'newest'
  }

  render() {
    const { posts, ids, category } = this.props
    let sortedIds

    switch (this.state.sort) {
      case 'newest' :
        sortedIds = ids.sort((a, b) => posts[b].timestamp - posts[a].timestamp)
        break
      case 'oldest' :
        sortedIds = ids.sort((a, b) => posts[a].timestamp - posts[b].timestamp)
        break
      case 'votes' :
        sortedIds = ids.sort((a, b) => posts[b].voteScore - posts[a].voteScore)
        break
      default :
        sortedIds = ids
    }

    return (
      <Fragment>
        {category && (
          <Helmet>
            <title>{category} | Readable</title>
          </Helmet>
        )}
        <ul className="tabs">
          <li className="tabs__item" onClick={() => this.setState({sort: 'newest'})}>Newest</li>
          <li className="tabs__item" onClick={() => this.setState({sort: 'oldest'})}>Oldest</li>
          <li className="tabs__item" onClick={() => this.setState({sort: 'votes'})}>Votes</li>
        </ul>
        {sortedIds.length ? (
          <ol className="posts-list">
            {sortedIds.map((id) => posts[id].deleted ? null : <Post id={id} key={id} />)}
          </ol>
        ) : (
          <p style={{textAlign: 'center'}}>There is no registered posts X(</p>
        )}
      </Fragment>
    )
  }
}

PostsList.propTypes = {
  posts: PropTypes.object.isRequired,
  ids: PropTypes.array.isRequired,
  category: PropTypes.string
}

export default PostsList
