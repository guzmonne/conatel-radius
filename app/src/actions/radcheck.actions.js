import {Schemas} from '../middleware/api.js'
import {createIndexAction} from './rest.actions.js'
/* Radcheck Index Action */
export const RADCHECK_INDEX_REQUEST = 'RADCHECK_INDEX_REQUEST'
export const RADCHECK_INDEX_SUCCESS = 'RADCHECK_INDEX_SUCCESS'
export const RADCHECK_INDEX_ERROR = 'RADCHECK_INDEX_ERROR'

export const radcheckIndex = createIndexAction({
  name: 'radcheck',
  types: [RADCHECK_INDEX_REQUEST, RADCHECK_INDEX_SUCCESS, RADCHECK_INDEX_ERROR],
  schema: Schemas.RADCHECK_ARRAY,
})
