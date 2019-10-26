import { receiveCategories } from './categories'
import { receiveComments, addComment, deleteComment, deleteParentPost } from './comments'
import { receivePosts, deletePost, addChildComment, deleteChildComment } from './posts'
import {
  getCategories,
  getComments,
  getPosts,
  addCommentToPost,
  disableComment,
  disablePost
} from '../utils/api'

export function handleInitialData() {
  return (dispatch) =>
    Promise.all([getCategories(), getComments(), getPosts()])
      .then(([categories, comments, posts]) => {
        dispatch(receiveCategories(categories))
        dispatch(receiveComments(comments))
        dispatch(receivePosts(posts))
      })
}

export function handleAddComment(comment) {
  const { id, parentId } = comment

  return (dispatch) => {
    addCommentToPost(comment)
      .then(() => {
        dispatch(addComment({ [id]: comment }))
        dispatch(addChildComment(parentId))
      })
      .catch(() => {
        alert('There was an error. Please try again.')
      })
  }
}

export function handleDeleteComment(comment) {
  const { id, parentId } = comment

  return (dispatch) => {
    disableComment(id)
      .then(() => {
        dispatch(deleteComment(id))
        dispatch(deleteChildComment(parentId))
      })
      .catch(() => {
        alert('There was an error. Please try again.')
      })
  }
}

export function handleDeletePost(id) {
  return (dispatch, getState) => {
    const { comments } = getState()
    const commentIds = Object.keys(comments).filter(commentId => {
      return comments[commentId].parentId === id
    })

    disablePost(id)
      .then(() => {
        dispatch(deletePost(id))
        commentIds.map((id) => dispatch(deleteParentPost(id)))
      })
      .catch(() => {
        alert('There was an error. Please try again.')
      })
  }
}
