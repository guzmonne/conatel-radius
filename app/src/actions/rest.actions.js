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
  return (params={}) => (dispatch, getState) => {
    const {limit, offset} = getState()[name]
    return dispatch(callIndex({limit, offset}))
  }
}

export const createUpdateUiAction = ({type}) => ui => ({type, ui})
