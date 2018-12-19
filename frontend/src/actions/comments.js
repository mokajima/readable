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

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id
  }
}

export function upCommentVote(id) {
  return {
    type: UP_COMMENT_VOTE,
    id
  }
}

export function downCommentVote(id) {
  return {
    type: DOWN_COMMENT_VOTE,
    id
  }
}

export function deleteParentPost(id) {
  return {
    type: DELETE_PARENT_POST,
    id
  }
}
