import {CALL_API, Schemas} from '../middleware/api.js'
/* Radcheck Index Action */
export const RADCHECK_INDEX_REQUEST = 'RADCHECK_INDEX_REQUEST'
export const RADCHECK_INDEX_SUCCESS = 'RADCHECK_INDEX_SUCCESS'
export const RADCHECK_INDEX_ERROR = 'RADCHECK_INDEX_ERROR'

const callRadcheckIndex = ({limit, offset}) => ({
  [CALL_API]: {
    types: [RADCHECK_INDEX_REQUEST, RADCHECK_INDEX_SUCCESS, RADCHECK_INDEX_ERROR],
    endpoint: `/api/radcheck?limit=${limit}&offset=${offset}`,
    schema: Schemas.RADCHECK_ARRAY,
  },
})

export const radcheckIndex = (params={}) => (dispatch, getState) => {
  const {limit, offset} = getState().radcheck
  return dispatch(callRadcheckIndex({limit, offset}))
}