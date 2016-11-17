import TableHoF from './TableHoF.js'
import {IUserItems} from '../../interfaces.js'

const UsersTable = TableHoF([
  'Id',
  'Username',
  'Email',
  'Phone',
  'CreatedAt',
  'UpdatedAt',
], IUserItems)

export default UsersTable
