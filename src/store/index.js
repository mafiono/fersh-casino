import { createStore } from 'vuex'
import common from './modules/common'
import messages from './modules/messages'
import player from './modules/player'
import messagesSocket from './plugins/webSocketPlugin'

const store = createStore({
  modules: {
    common,
    messages,
    player,
  },
  plugins: [messagesSocket()],
})

export default store
