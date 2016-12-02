import {Schemas} from '../middleware/api.js'
import {
  createIndexAction,
  createCreateAction,
  createUpdateUiAction
} from './rest.actions.js'
/* SSID Index Action */
export const SSID_INDEX_REQUEST = 'SSID_INDEX_REQUEST'
export const SSID_INDEX_SUCCESS = 'SSID_INDEX_SUCCESS'
export const SSID_INDEX_ERROR = 'SSID_INDEX_ERROR'

export const ssidIndex = createIndexAction({
  name: 'ssid',
  types: [SSID_INDEX_REQUEST, SSID_INDEX_SUCCESS, SSID_INDEX_ERROR],
  schema: Schemas.SSID_ARRAY,
})

export const SSID_CREATE_REQUEST = 'SSID_CREATE_REQUEST'
export const SSID_CREATE_SUCCESS = 'SSID_CREATE_SUCCESS'
export const SSID_CREATE_ERROR = 'SSID_CREATE_ERROR'

export const ssidCreate = createCreateAction({
  name: 'ssid',
  types: [SSID_CREATE_REQUEST, SSID_CREATE_SUCCESS, SSID_CREATE_ERROR],
  schema: Schemas.SSID,
})

export const SSID_UPDATE_UI = 'SSID_UPDATE_UI' 

export const ssidUpdateUi = createUpdateUiAction({type: SSID_UPDATE_UI})

