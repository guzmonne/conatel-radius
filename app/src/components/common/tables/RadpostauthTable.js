import TableHoF from './TableHoF.js'
import {IRadpostauthItems} from '../../interfaces.js'

const RadpostauthTable = TableHoF([
  'ID',
  'Username',
  'Reply',
  'AuthDate'
], IRadpostauthItems)

export default RadpostauthTable
