import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Post from './Post'

class PostsList extends Component {
  state = {
    sort: 'newest'
  }

  render() {
    const { posts, ids } = this.props
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
        <ul>
          <li onClick={() => this.setState({sort: 'newest'})}>Newest</li>
          <li onClick={() => this.setState({sort: 'oldest'})}>Oldest</li>
          <li onClick={() => this.setState({sort: 'votes'})}>Votes</li>
        </ul>
        <ol>
          {sortedIds.map((id) => posts[id].deleted ? null : <Post id={id} key={id} />)}
        </ol>
      </Fragment>
    )
  }
}

function mapStateToProps({ posts }, { category }) {
  const ids = category
    ? Object.keys(posts).filter((id) => posts[id].category === category)
    : Object.keys(posts)

  return {
    posts,
    ids
  }
}

export default connect(mapStateToProps)(PostsList)
