import { RECEIVE_CATEGORIES } from '../actions/types'

export default function categories(state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES :
      return state.concat(action.categories)
    default :
      return state
  }
}
