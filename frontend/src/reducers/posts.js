import {
  RECEIVE_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  UP_POST_VOTE,
  DOWN_POST_VOTE,
  ADD_CHILD_COMMENT,
  DELETE_CHILD_COMMENT
} from 'actions/types'

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS :
      return {
        ...state,
        ...action.posts
      }
    case ADD_POST :
    case EDIT_POST :
      return {
        ...state,
        ...action.post
      }
    case DELETE_POST :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: true
        }
      }
    case UP_POST_VOTE :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: ++state[action.id].voteScore
        }
      }
    case DOWN_POST_VOTE :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: --state[action.id].voteScore
        }
      }
    case ADD_CHILD_COMMENT :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          commentCount: ++state[action.id].commentCount
        }
      }
    case DELETE_CHILD_COMMENT :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          commentCount: --state[action.id].commentCount
        }
      }
    default :
      return state
  }
}
