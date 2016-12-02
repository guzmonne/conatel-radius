import { Schema, arrayOf, normalize } from 'normalizr'
import isString from 'lodash/isString'
import isEmpty from 'lodash/isEmpty'
// Action key that carries the call info by this Redux middleware
export const CALL_API = Symbol('Call API')
/**
 * Calls the api and normalizes the result.
 * @param  {String} endpoint URL of the endpoint target
 * @param  {Schema} schema   Normalizr schema.
 * @param  {Object} options  Fetch options.
 * @param  {String} options.method  HTTP method. Defaults to GET.
 * @param  {Object} options.body    Body to post to the endpoint.
 */
const callApi = (endpoint, schema, options={}) => {
  const params = Object.assign({},{
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }, options)
  return fetch(endpoint, params)
  .then(response => response.json()
    .then(json => {
      if (!response.ok)
        return Promise.reject(json)
      return Object.assign({}, normalize(json, schema))
    })
  )
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
/**
 * Creates a new schema.
 * @param  {String} name Name of the schema.
 * @return {Schema} Normalizr schema.
 */
const createSchema = (name) => new Schema(name, {idAttribute: getID})
/** SCHEMAS */
const adminsSchema = createSchema('admins')
const radcheckSchema = createSchema('radcheck')
const radpostauthSchema = createSchema('radpostauth')
const nasSchema = createSchema('nas')
const ssidSchema = createSchema('ssid')
/* EXPORT SCHEMAS */
export const Schemas = {
  ADMIN: adminsSchema,
  ADMIN_ARRAY: arrayOf(adminsSchema),
  NAS: nasSchema,
  NAS_ARRAY: arrayOf(nasSchema),
  SSID: ssidSchema,
  SSID_ARRAY: arrayOf(ssidSchema),
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
  // If it not a CALL_API action go to next middleware.
  if (typeof callAPI === 'undefined')
    return next(action)
  const {endpoint, types, schema, options} = callAPI
  // Endpoint must be defined as a String
  if (!isString(endpoint))
    throw new Error('Specify a string method to call.')
  // A schema must be provided.
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  /**
   * Action generator that merges the provided data with
   * the other information found on the original action. 
   * Any value set outside the [CALL_API] key will be
   * added to each subsequent action.
   * @param  {Object} data  Additional data to set on the 
   *                        new action.
   * @return {Action}
   */
  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }
  // Gets the actions from the types. Notice the order!
  const [requestType, successType, failureType] = types
  // Dispatch the request action.
  next(actionWith({type: requestType}))
  // Dispatch an action to clean the current error message
  next({type: 'RESET_ERROR_MESSAGE'})
  // Call to the API. If the request is successful, dispatch
  // the success action, else dispatch the failure action.
  return callApi(endpoint, schema, options)
  .then(response => next(actionWith({
    response,
    type: successType,
  })))
  .catch(error => {
    if (isEmpty(error))
      error = '[404] Not Found'
    next(actionWith({
      error,
      type: failureType,
    }))
  })
}