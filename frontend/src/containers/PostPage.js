import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

// action
import * as sharedActions from 'actions/shared'
import * as commentsActions from 'actions/comments'
import * as postsActions from 'actions/posts'

// util
import { getId, getTimestamp } from 'utils/helpers'

// view
import PostPage from 'components/PostPage'

const PostPageContainer = () => {
  const [values, setValues] = useState({
    author: '',
    body: ''
  })
  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments)
  const posts = useSelector(state => state.posts)
  const history = useHistory()
  const { category, id } = useParams()

  const disabled = useMemo(() => {
    const { author, body } = values
    return author.trim() === '' || body.trim() === ''
  }, [values])

  const postCommentIds = useMemo(() => {
    return Object.keys(comments).filter(commentId => {
      return comments[commentId].parentId === id
    })
  }, [comments, id])

  const postComments = useMemo(() => {
    return postCommentIds.map(commentId => comments[commentId])
  }, [comments, postCommentIds])

  const post = useMemo(() => {
    return posts[id] && posts[id].category === category
      ? posts[id]
      : null
  }, [category, id, posts])

  const handleChange = (targetName, newValue) => {
    setValues(v => ({ ...v, [targetName]: newValue }))
  }

  const handleSubmit = () => {
    const newComment = {
      ...values,
      id: getId(),
      parentId: post.id,
      timestamp: getTimestamp(),
      voteStore: 1,
      deleted: false,
      parentDeleted: false
    }

    dispatch(sharedActions.handleAddComment(newComment))

    setValues({ author: '', body: '' })
  }

  const handleDeletePost = () => {
    dispatch(sharedActions.handleDeletePost(id, postCommentIds))
    history.push('/')
  }

  const handleUpPostVote = () => {
    dispatch(postsActions.handleUpPostVote(id))
  }

  const handleDownPostVote = () => {
    dispatch(postsActions.handleDownPostVote(id))
  }

  const handleDeleteComment = comment => {
    dispatch(sharedActions.handleDeleteComment(comment))
  }

  const handleUpCommentVote = id => {
    dispatch(commentsActions.handleUpCommentVote(id))
  }

  const handleDownCommentVote = id => {
    dispatch(commentsActions.handleDownCommentVote(id))
  }

  return (
    <PostPage
      comments={postComments}
      disabled={disabled}
      post={post}
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleDeletePost={handleDeletePost}
      handleUpPostVote={handleUpPostVote}
      handleDownPostVote={handleDownPostVote}
      handleDeleteComment={handleDeleteComment}
      handleUpCommentVote={handleUpCommentVote}
      handleDownCommentVote={handleDownCommentVote}
    />
  )
}

export default PostPageContainer
