import union from 'lodash/union'

const defaultState = {
  ids: [],
  limit: 1,
  offset: 0,
  ui: {},
}

export default (rest, defaults) => (state=Object.assign({}, defaultState, defaults), action) => {
  switch(action.type) {
    case rest.updateUiAction:
      return {
        ...state,
        ui: {...state.ui, ...action.ui},
      }
    case rest.createAction:
      return {
        ...state,
        ids: union(state.ids, [action.response.result]),
      }
    case rest.indexAction:
      return {
        ...state,
        ids: union(state.ids, action.response.result),
        offset: state.offset + action.response.result.length,
      }
    default:
      return state
  }
}