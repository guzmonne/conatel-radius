import {nasIndex, nasCreate, nasUpdateUi} from '../actions/'
import {INasItems} from '../components/interfaces.js'
import NasComponent from '../components/Nas.js'
import listContainer from './listContainer.js'

const SSIDContainer = listContainer({
  itemsInterface: INasItems,
  name: 'nas',
  onFetch: nasIndex,
  onCreate: nasCreate,
  onUpdateUi: nasUpdateUi,
  Component: NasComponent,
})

export default SSIDContainer
