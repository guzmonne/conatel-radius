import {adminsIndex, adminsCreate, adminsUpdateUi} from '../actions/'
import AdminsComponent from '../components/Admins.js'
import {IUserItems} from '../components/interfaces.js'
import listContainer from './listContainer.js'

const AdminsContainer = listContainer({
  itemsInterface: IUserItems,
  name: 'admins',
  onFetch: adminsIndex,
  onCreate: adminsCreate,
  onUpdateUi: adminsUpdateUi,
  Component: AdminsComponent,
})

export default AdminsContainer
