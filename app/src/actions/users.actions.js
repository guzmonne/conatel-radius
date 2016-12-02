import {Schemas} from '../middleware/api.js'
import {
  createIndexAction,
  createCreateAction,
  createUpdateUiAction
} from './rest.actions.js'

/* USERS Index Action */
export const USERS_INDEX_REQUEST = 'USERS_INDEX_REQUEST'
export const USERS_INDEX_SUCCESS = 'USERS_INDEX_SUCCESS'
export const USERS_INDEX_ERROR = 'USERS_INDEX_ERROR'

export const usersIndex = createIndexAction({
  name: 'users',
  types: [USERS_INDEX_REQUEST, USERS_INDEX_SUCCESS, USERS_INDEX_ERROR],
  schema: Schemas.USER_ARRAY,
})

export const USERS_CREATE_REQUEST = 'USERS_CREATE_REQUEST'
export const USERS_CREATE_SUCCESS = 'USERS_CREATE_SUCCESS'
export const USERS_CREATE_ERROR = 'USERS_CREATE_ERROR'

export const usersCreate = createCreateAction({
  name: 'users',
  types: [USERS_CREATE_REQUEST, USERS_CREATE_SUCCESS, USERS_CREATE_ERROR],
  schema: Schemas.USER,
})

export const USERS_UPDATE_UI = 'USERS_UPDATE_UI' 

export const usersUpdateUi = createUpdateUiAction({type: USERS_UPDATE_UI})

