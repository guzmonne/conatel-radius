import TableHoF from './TableHoF.js'
import {INasItems} from '../../interfaces.js'

const NasTable = TableHoF([
  {name: 'Nasname'},
  {name: 'Shortname'},
  {name: 'Secret', type: 'hidden'},
  {name: 'Description'},
], INasItems)

export default NasTable
