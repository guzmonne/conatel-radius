import {NasTable} from './common/tables/'
import {INasItems} from './interfaces.js'
import NasForm from './common/forms/NasForm.js'
import listComponent from './common/listComponent.js'

const Nas = listComponent({
  className: 'Nas',
  createHeader: 'Crear nuevo cliente',
  name: 'cliente',
  Table: NasTable,
  Form: NasForm,
  itemsInterface: INasItems,
})

export default Nas