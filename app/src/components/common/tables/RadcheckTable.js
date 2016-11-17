import TableHoF from './TableHoF.js'
import {IRadcheckItems} from '../../interfaces.js'

const RadcheckTable = TableHoF([
  'ID',
  'Username',
  'Attribute',
  'OP',
  'Value',
], IRadcheckItems)

export default RadcheckTable
