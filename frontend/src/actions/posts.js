import { addNewPost, updatePost, votePost } from 'utils/api'

import {
  RECEIVE_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  UP_POST_VOTE,
  DOWN_POST_VOTE,
  ADD_CHILD_COMMENT,
  DELETE_CHILD_COMMENT
} from './types'

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function handleAddPost(post) {
  const { id } = post

  return (dispatch) => {
    addNewPost(post)
      .then(dispatch(addPost({ [id]: post })))
      .catch(() => {
        alert('There was an error. Please try again.')
      })
  }
}

function editPost(post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function handleEditPost(post) {
  const { id } = post

  return (dispatch) => {
    updatePost(post)
      .then(dispatch(editPost({ [id]: post })))
      .catch(() => {
        alert('There was an error. Please try again.')
      })
  }
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}

function upPostVote(id) {
  return {
    type: UP_POST_VOTE,
    id
  }
}

export function handleUpPostVote(id) {
  return (dispatch) => {
    votePost(id, 'upVote')
      .then(dispatch(upPostVote(id)))
      .catch(() => {
        alert('There was an error. Please try again.')
      })
  }
}

function downPostVote(id) {
  return {
    type: DOWN_POST_VOTE,
    id
  }
}

export function handleDownPostVote(id) {
  return (dispatch) => {
    votePost(id, 'downVote')
      .then(dispatch(downPostVote(id)))
      .catch(() => {
        alert('There was an error. Please try again.')
      })
  }
}

export function addChildComment(id) {
  return {
    type: ADD_CHILD_COMMENT,
    id
  }
}

export function deleteChildComment(id) {
  return {
    type: DELETE_CHILD_COMMENT,
    id
  }
}
