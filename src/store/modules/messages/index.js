import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default {
  name: 'messages',
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
