import merge from 'lodash/merge'
import { combineReducers } from 'redux'
import {reducer as form} from 'redux-form'
import * as ActionTypes from '../actions'
import rest from './rest.js'

const radcheck = rest({
  indexAction: ActionTypes.RADCHECK_INDEX_SUCCESS,
})

const nas = rest({
  indexAction: ActionTypes.NAS_INDEX_SUCCESS,
  createAction: ActionTypes.NAS_CREATE_SUCCESS,
  updateUiAction: ActionTypes.NAS_UPDATE_UI,
}, {
  ui: {
    isOpenCreateModal: false,
  }
})

const users = rest({
  indexAction: ActionTypes.USERS_INDEX_SUCCESS,
  createAction: ActionTypes.USERS_CREATE_SUCCESS,
  updateUiAction: ActionTypes.USERS_UPDATE_UI,
}, {
  ui: {
    isOpenCreateModal: false,
  }
})

/**
 * Updates an entity cache in response to any action with response.entities.
 * @param  {Object} state           List of cached collections.
 * @param  {String} action.type     Action type
 * @param  {Object} action.entities Normalizr result after normalizing response.
 * @return {Object} New reduced state.
 */
const entities = (state = {radcheck: {}, users: {}, nas: {}, radpostauth: {}}, action) => {
  if (action.response && action.response.entities)
    return merge({}, state, action.response.entities)
  return state
}
/**
 * Updates error message to notify about the failed fetches.
 * @param  {Object} state        Error object or null.
 * @param  {String} action.type  Action type
 * @param  {Object} action.error New error message.
 * @return {Object} New reduced state.
 */
const errorMessage = (state = null, action) => {
  const { type, error } = action
  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error && error.error) {
    return error.error // TODO: Improve error readability
  }
  return state
}
/**
 * Helper function to camelize a string. Characters like underscores
 * are not replaced by default. Must be removed before calling this
 * function.
 * @param  {String} string String to be camelized.
 * @return {String} Camelized string.
 */
const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}
/**
 * Updates the loading flag after an action call.
 * @param  {Object} state        Error object or null.
 * @param  {String} action.type  Action type
 * @return {Object} New reduced state.
 */
const flags = (state = {}, action) => {
  const requestRegExp = /_REQUEST$/
  const successRegExp = /_SUCCESS$/
  const errorRegExp = /_ERROR$/
  const {type} = action
  let length, isLoading
  if (requestRegExp.test(type)) {
    length = 8
    isLoading = true
  } else if (successRegExp.test(type)) {
    length = 8
    isLoading = false
  } else if (errorRegExp.test(type)) {
    length = 6
    isLoading = false
  }
  if (!length) return state
  const key = camelize(type.slice(0, -length).toLowerCase().replace('_', ' '))
  return Object.assign({}, state, {[key]: isLoading})
}
/**
 * Application root redicer.
 */
const rootReducer = combineReducers({
  entities,
  flags,
  form,
  radcheck,
  users,
  nas,
  error: errorMessage,
})

export default rootReducer
