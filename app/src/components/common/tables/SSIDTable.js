import TableHoF from './TableHoF.js'
import {ISSIDItems} from '../../interfaces.js'

const SSIDTable = TableHoF([
  {name: 'Name', alias: 'Nombre'},
  {name: 'Vendor', alias: 'Fabricante'},
  {name: 'CreatedAt', alias: 'Creado', type: 'date', method: 'fromNow'},
  {name: 'UpdatedAt', alias: 'Actualizado', type: 'date', method: 'fromNow'},
], ISSIDItems)

export default SSIDTable
