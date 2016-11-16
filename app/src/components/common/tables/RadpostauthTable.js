import {PropTypes as T} from 'react'
import TableHoF from './TableHoF.js'

const IRadpostauthItems = T.arrayOf(T.shape({
  id: T.number,
  username: T.string,
  reply: T.string,
  AuthDate: T.string,
}))

const RadpostauthTable = TableHoF([
  'ID',
  'Username',
  'Reply',
  'AuthDate'
], IRadpostauthItems)

export default RadpostauthTable
export {IRadpostauthItems}
