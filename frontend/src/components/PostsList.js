import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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

    if ('add' === category) {
      return null // 'add' is not a category
    }

    return (
      <Fragment>
        <ul className="tabs">
          <li className="tabs__item" onClick={() => this.setState({sort: 'newest'})}>Newest</li>
          <li className="tabs__item" onClick={() => this.setState({sort: 'oldest'})}>Oldest</li>
          <li className="tabs__item" onClick={() => this.setState({sort: 'votes'})}>Votes</li>
        </ul>
        <ol className="posts-list">
          {sortedIds.map((id) => posts[id].deleted ? null : <Post id={id} key={id} />)}
        </ol>
      </Fragment>
    )
  }
}

PostsList.propTypes = {
  posts: PropTypes.object.isRequired,
  ids: PropTypes.array.isRequired,
  category: PropTypes.string
}

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
