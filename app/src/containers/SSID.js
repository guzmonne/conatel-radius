import {ssidIndex, ssidCreate, ssidUpdateUi} from '../actions/'
import {ISSIDItems} from '../components/interfaces.js'
import SSIDComponent from '../components/SSID.js'
import listContainer from './listContainer.js'

const SSIDContainer = listContainer({
  itemsInterface: ISSIDItems,
  name: 'ssid',
  onFetch: ssidIndex,
  onCreate: ssidCreate,
  onUpdateUi: ssidUpdateUi,
  Component: SSIDComponent,
})

export default SSIDContainer
