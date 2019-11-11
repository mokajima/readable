import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// action
import * as sharedActions from 'actions/shared'
import * as postsActions from 'actions/posts'

// view
import PostsList from 'components/PostsList'

const PostsListContainer = () => {
  const [sort, setSort] = useState('newest')
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts)
  const { category } = useParams()

  const filteredPostIds = useMemo(() => {
    const postIds = Object.keys(posts)

    if (category) {
      return postIds.filter(id => posts[id].category === category)
    }

    return postIds
  }, [category, posts])

  const sortedPostIds = useMemo(() => {
    switch (sort) {
      case 'newest':
        return filteredPostIds.sort((a, b) => posts[b].timestamp - posts[a].timestamp)
      case 'oldest' :
        return filteredPostIds.sort((a, b) => posts[a].timestamp - posts[b].timestamp)
      case 'votes' :
        return filteredPostIds.sort((a, b) => posts[b].voteScore - posts[a].voteScore)
      default :
        return filteredPostIds
    }
  }, [filteredPostIds, posts, sort])

  const handleClick = sort => {
    setSort(sort)
  }

  const handleDeletePost = id => {
    dispatch(sharedActions.handleDeletePost(id))
  }

  const handleUpPostVote = id => {
    dispatch(postsActions.handleUpPostVote(id))
  }

  const handleDownPostVote = id => {
    dispatch(postsActions.handleDownPostVote(id))
  }

  return (
    <PostsList
      category={category}
      ids={sortedPostIds}
      posts={posts}
      handleClick={handleClick}
      handleDeletePost={handleDeletePost}
      handleUpPostVote={handleUpPostVote}
      handleDownPostVote={handleDownPostVote}
    />
  )
}

export default PostsListContainer
