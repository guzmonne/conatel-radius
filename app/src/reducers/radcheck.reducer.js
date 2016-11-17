import * as ActionTypes from '../actions/'
import union from 'lodash/union'

export default (state = {
  ids: [],
  limit: 1,
  offset: 0,
}, action) => {
  switch(action.type) {
    case ActionTypes.RADCHECK_INDEX_SUCCESS:
      return {
        ...state,
        ids: union(state.ids, action.response.result),
        offset: state.offset + action.response.result.length,
      }
    default:
      return state
  }
}