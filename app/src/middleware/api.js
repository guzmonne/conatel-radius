import { Schema, arrayOf, normalize } from 'normalizr'
import isString from 'lodash/isString'
// Action key that carries the call info by this Redux middleware
export const CALL_API = Symbol('Call API')

const callApi = (endpoint, schema) => {
  return fetch(endpoint)
  .then(response => response.json().then(json => {
    if (!response.status === 200)
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
const radcheckSchema = new Schema('radcheck', {idAttribute: getID})
const radpostauthSchema = new Schema('radpostauth', {idAttribute: getID})
/* Export Schemas */
export const Schemas = {
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
  
  const {endpoint, types, schema} = callAPI
  
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
  
  return callApi(endpoint, schema)
  .then(response => next(actionWith({
    response,
    type: successType,
  })))
  .catch(error => next(actionWith({
    error,
    type: failureType,
  })))
}