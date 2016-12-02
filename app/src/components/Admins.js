import {AdminsTable} from './common/tables/'
import {IUserItems} from './interfaces.js'
import AdminForm from './common/forms/AdminForm.js'
import listComponent from './common/listComponent.js'

const Admin = listComponent({
  className: 'SSID',
  createHeader: 'Crear nuevo administrador',
  name: 'administrador',
  Table: AdminsTable,
  Form: AdminForm,
  itemsInterface: IUserItems,
})

export default Admin
