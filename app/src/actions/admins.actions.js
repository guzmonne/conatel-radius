import {Schemas} from '../middleware/api.js'
import {
  createIndexAction,
  createCreateAction,
  createUpdateUiAction
} from './rest.actions.js'

/* ADMINS Index Action */
export const ADMINS_INDEX_REQUEST = 'ADMINS_INDEX_REQUEST'
export const ADMINS_INDEX_SUCCESS = 'ADMINS_INDEX_SUCCESS'
export const ADMINS_INDEX_ERROR = 'ADMINS_INDEX_ERROR'

export const adminsIndex = createIndexAction({
  name: 'admins',
  types: [ADMINS_INDEX_REQUEST, ADMINS_INDEX_SUCCESS, ADMINS_INDEX_ERROR],
  schema: Schemas.ADMIN_ARRAY,
})

export const ADMINS_CREATE_REQUEST = 'ADMINS_CREATE_REQUEST'
export const ADMINS_CREATE_SUCCESS = 'ADMINS_CREATE_SUCCESS'
export const ADMINS_CREATE_ERROR = 'ADMINS_CREATE_ERROR'

export const adminsCreate = createCreateAction({
  name: 'admins',
  types: [ADMINS_CREATE_REQUEST, ADMINS_CREATE_SUCCESS, ADMINS_CREATE_ERROR],
  schema: Schemas.ADMIN,
})

export const ADMINS_UPDATE_UI = 'ADMINS_UPDATE_UI' 

export const adminsUpdateUi = createUpdateUiAction({type: ADMINS_UPDATE_UI})

