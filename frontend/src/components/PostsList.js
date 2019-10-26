import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Post from '../components/Post'

const tabs = ['newest', 'oldest', 'votes']

const PostsList = ({
  category,
  ids,
  posts,
  handleClick,
  handleDeletePost,
  handleUpPostVote,
  handleDownPostVote
}) => (
  <>
    {category && (
      <Helmet>
        <title>{category} | Readable</title>
      </Helmet>
    )}
    <ul className="tabs">
      {tabs.map(tab => (
        <li
          key={tab}
          className="tabs__item"
          onClick={() => handleClick(tab)}
        >
          {tab.toUpperCase()}
        </li>
      ))}
    </ul>
    {ids.length ? (
      <ol className="posts-list">
        {ids.map(id => {
          const post = posts[id]
          return !post.deleted ? (
            <Post
              post={post}
              handleDeletePost={handleDeletePost}
              handleUpPostVote={handleUpPostVote}
              handleDownPostVote={handleDownPostVote}
            />
          ) : null
        })}
      </ol>
    ) : (
        <p style={{ textAlign: 'center' }}>
          There is no registered posts X(
        </p>
    )}
  </>
)

PostsList.propTypes = {
  category: PropTypes.string,
  ids: PropTypes.array.isRequired,
  posts: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleUpPostVote: PropTypes.func.isRequired,
  handleDownPostVote: PropTypes.func.isRequired
}

export default PostsList
