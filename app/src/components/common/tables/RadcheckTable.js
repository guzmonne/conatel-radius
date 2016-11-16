import {PropTypes as T} from 'react'
import TableHoF from './TableHoF.js'

const IRadcheckItems = T.arrayOf(T.shape({
  id: T.number,
  username: T.string,
  attribute: T.string,
  op: T.string,
  value: T.string,
}))

const RadcheckTable = TableHoF([
  'ID',
  'Username',
  'Attribute',
  'OP',
  'Value',
], IRadcheckItems)

export default RadcheckTable
export {IRadcheckItems}
