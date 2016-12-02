import {NasTable} from './common/tables/'
import {ISSIDItems} from './interfaces.js'
import SSIDForm from './common/forms/SSIDForm.js'
import listComponent from './common/listComponent.js'

const SSID = listComponent({
  className: 'SSID',
  createHeader: 'Crear nuevo SSID',
  name: 'SSID',
  Table: NasTable,
  Form: SSIDForm,
  itemsInterface: ISSIDItems,
})

export default SSID
