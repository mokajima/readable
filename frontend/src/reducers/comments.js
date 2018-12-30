import {
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UP_COMMENT_VOTE,
  DOWN_COMMENT_VOTE,
  DELETE_PARENT_POST
} from '../actions/types'

export default function comments(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS :
      return {
        ...state,
        ...action.comments
      }
    case ADD_COMMENT :
    case EDIT_COMMENT :
      return {
        ...state,
        ...action.comment
      }
    case DELETE_COMMENT :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: true
        }
      }
    case UP_COMMENT_VOTE :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: ++state[action.id].voteScore
        }
      }
    case DOWN_COMMENT_VOTE :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: --state[action.id].voteScore
        }
      }
    case DELETE_PARENT_POST :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          parentDeleted: true
        }
      }
    default :
      return state
  }
}
