import { updateComment, voteComment } from '../utils/api'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UP_COMMENT_VOTE = 'UP_COMMENT_VOTE'
export const DOWN_COMMENT_VOTE = 'DOWN_COMMENT_VOTE'
export const DELETE_PARENT_POST = 'DELETE_PARENT_POST'

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
        alert( 'There was an error. Please try again.' )
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
        alert( 'There was an error. Please try again.' )
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
        alert( 'There was an error. Please try again.' )
      })
  }
}

export function deleteParentPost(id) {
  return {
    type: DELETE_PARENT_POST,
    id
  }
}
