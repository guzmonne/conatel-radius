import TableHoF from './TableHoF.js'
import {IRadcheckItems} from '../../interfaces.js'

const RadcheckTable = TableHoF([
  'Id',
  'Username',
  'Attribute',
  'OP',
  'Value',
], IRadcheckItems)

export default RadcheckTable
