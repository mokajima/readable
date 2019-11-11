import { updateComment, voteComment } from 'utils/api'
import {
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UP_COMMENT_VOTE,
  DOWN_COMMENT_VOTE,
  DELETE_PARENT_POST
} from './types'

export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function handleEditComment(comment) {
  return (dispatch) => {
    updateComment(comment)
      .then(() => {
        dispatch(editComment({
          [comment.id]: comment
        }))
      })
      .catch(() => {
        alert('There was an error. Please try again.')
      })
  }
}

export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id
  }
}

function upCommentVote(id) {
  return {
    type: UP_COMMENT_VOTE,
    id
  }
}

export function handleUpCommentVote(id) {
  return (dispatch) => {
    voteComment(id, 'upVote')
      .then(dispatch(upCommentVote(id)))
      .catch(() => {
        alert('There was an error. Please try again.')
      })
  }
}

function downCommentVote(id) {
  return {
    type: DOWN_COMMENT_VOTE,
    id
  }
}

export function handleDownCommentVote(id) {
  return (dispatch) => {
    voteComment(id, 'downVote')
      .then(dispatch(downCommentVote(id)))
      .catch(() => {
        alert('There was an error. Please try again.')
      })
  }
}

export function deleteParentPost(id) {
  return {
    type: DELETE_PARENT_POST,
    id
  }
}
