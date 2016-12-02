import TableHoF from './TableHoF.js'
import {IUserItems} from '../../interfaces.js'

const UsersTable = TableHoF([
  {name: 'Username'},
  {name: 'Email'},
  {name: 'Role'},
  {name: 'Phone'},
  {name: 'CreatedAt', type: 'date', method: 'fromNow'},
  {name: 'UpdatedAt', type: 'date', method: 'fromNow'},
], IUserItems)

export default UsersTable
