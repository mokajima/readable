export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const UP_POST_VOTE = 'UP_POST_VOTE'
export const DOWN_POST_VOTE = 'DOWN_POST_VOTE'
export const ADD_CHILD_COMMENT = 'ADD_CHILD_COMMENT'
export const DELETE_CHILD_COMMENT = 'DELETE_CHILD_COMMENT'

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function editPost(post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}

export function upPostVote(id) {
  return {
    type: UP_POST_VOTE,
    id
  }
}

export function downPostVote(id) {
  return {
    type: DOWN_POST_VOTE,
    id
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
