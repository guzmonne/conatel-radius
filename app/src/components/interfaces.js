import {PropTypes as T} from 'react'
/** Radpostauth */
export const IRadpostauthItem = T.shape({
  id: T.number,
  username: T.string,
  reply: T.string,
  AuthDate: T.string,
})
export const IRadpostauthItems = T.arrayOf(IRadpostauthItem)
/** Radcheck */
export const IRadcheckItem = T.shape({
  id: T.number,
  username: T.string,
  attribute: T.string,
  op: T.string,
  value: T.string,
})
export const IRadcheckItems = T.arrayOf(IRadcheckItem)
/** Users */
export const IUserItem = T.shape({
  id: T.number,
  username: T.string,
  createdAt: T.string,
  updatedAt: T.string,
  email: T.string,
  phone: T.string,
})
export const IUserItems = T.arrayOf(IUserItem)