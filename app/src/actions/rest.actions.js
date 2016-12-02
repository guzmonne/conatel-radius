import {CALL_API} from '../middleware/api.js'

const createCallIndex = ({types, name, schema}) => ({limit, offset}) => ({
  [CALL_API]: {
    types,
    endpoint: `/api/${name}?limit=${limit}&offset=${offset}`,
    schema,
  }
})

export const createIndexAction = ({name, types, schema}) => {
  const callIndex = createCallIndex({types, name, schema})
  return () => (dispatch, getState) => {
    const state = getState()
    const loading = state.flags[`${name}Items`]
    if (loading) return    
    const {limit, offset} = state[name]
    return dispatch(callIndex({limit, offset}))
  }
}

const createCallCreate = ({types, name, schema}) => ({body}) => ({
  [CALL_API]: {
    types,
    schema,
    endpoint: `/api/${name}`,
    options: {
      method: 'POST',
      body: JSON.stringify(body)
    }
  }
})

export const createCreateAction = ({name, types, schema}) => {
  const callCreate = createCallCreate({types, name, schema})
  return (body) => dispatch => dispatch(callCreate({body}))
}

export const createUpdateUiAction = ({type}) => ui => ({type, ui})
