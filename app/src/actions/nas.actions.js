import {Schemas} from '../middleware/api.js'
import {
  createIndexAction,
  createCreateAction,
  createUpdateUiAction
} from './rest.actions.js'
/* NAS Index Action */
export const NAS_INDEX_REQUEST = 'NAS_INDEX_REQUEST'
export const NAS_INDEX_SUCCESS = 'NAS_INDEX_SUCCESS'
export const NAS_INDEX_ERROR = 'NAS_INDEX_ERROR'

export const nasIndex = createIndexAction({
  name: 'nas',
  types: [NAS_INDEX_REQUEST, NAS_INDEX_SUCCESS, NAS_INDEX_ERROR],
  schema: Schemas.NAS_ARRAY,
})

export const NAS_CREATE_REQUEST = 'NAS_CREATE_REQUEST'
export const NAS_CREATE_SUCCESS = 'NAS_CREATE_SUCCESS'
export const NAS_CREATE_ERROR = 'NAS_CREATE_ERROR'

export const nasCreate = createCreateAction({
  name: 'nas',
  types: [NAS_CREATE_REQUEST, NAS_CREATE_SUCCESS, NAS_CREATE_ERROR],
  schema: Schemas.NAS,
})

export const NAS_UPDATE_UI = 'NAS_UPDATE_UI' 

export const nasUpdateUi = createUpdateUiAction({type: NAS_UPDATE_UI})

