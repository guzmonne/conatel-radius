import { Schema, arrayOf, normalize } from 'normalizr'
import isString from 'lodash/isString'
// Action key that carries the call info by this Redux middleware
export const CALL_API = Symbol('Call API')

const callApi = (endpoint, schema, options={}) => {
  const params = Object.assign({},{
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }, options)
  return fetch(endpoint, params)
  .then(response => response.json().then(json => {
    if (json.error)
      return Promise.reject(json)
    return Object.assign({}, normalize(json, schema))
  }))
}
/**
 * Schemas
 */
/**
 * Returns the id attribute of the item.
 * @param  {Object}        item     Item object.
 * @param  {String|Number} item.id  Item ID.
 * @return {String|Number} Item ID.
 */
const getID = item => item.id

const getSchema = (name) => new Schema(name, {idAttribute: getID})

const usersSchema = getSchema('users')
const radcheckSchema = getSchema('radcheck')
const radpostauthSchema = getSchema('radpostauth')
/* Export Schemas */
export const Schemas = {
  USER: usersSchema,
  USER_ARRAY: arrayOf(usersSchema),
  RADCHECK: radcheckSchema,
  RADCHECK_ARRAY: arrayOf(radcheckSchema),
  RADPOSTAUTH: radpostauthSchema,
  RADPOSTAUTH_ARRAY: arrayOf(radpostauthSchema),
}
/**
 * A redux middleware that interprets actions with CALL_AWS info 
 * specified. Performs the call to the server, and promises when
 * such actions are dispatched.
 */
export default store => next => action => {
  const callAPI = action[CALL_API]
  
  if (typeof callAPI === 'undefined')
    return next(action)
  
  const {endpoint, types, schema, options} = callAPI
  
  if (!isString(endpoint))
    throw new Error('Specify a string method to call.')
  
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  
  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }
  
  const [requestType, successType, failureType] = types
  
  next(actionWith({type: requestType}))
  
  return callApi(endpoint, schema, options)
  .then(response => next(actionWith({
    response,
    type: successType,
  })))
  .catch(error => next(actionWith({
    error,
    type: failureType,
  })))
}