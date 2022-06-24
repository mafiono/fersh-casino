const state = {
  playerId: '',
  uuid: '',
}

const actions = {
  /**
   * Сохранение uuid пользователя
   * @param state
   * @param commit
   * @param payload
   */
  // eslint-disable-next-line no-unused-vars
  setPlayerUuid ({ state, commit }, payload) {
    commit('setPlayerUuidData', payload)
  },
  /**
   * Сохранение id пользователя
   * @param state
   * @param commit
   * @param payload
   */
  // eslint-disable-next-line no-unused-vars
  setPlayerId ({ state, commit }, payload) {
    commit('setPlayerIdData', payload)
  },
}

const mutations = {
  /**
   * Сохранение uuid пользователя
   * @param state
   * @param payload
   */
  setPlayerUuidData (state, payload) {
    state.uuid = payload
  },
  /**
   * Сохранение id пользователя
   * @param state
   * @param payload
   */
  setPlayerIdData (state, payload) {
    state.playerId = payload
  },
  /**
   * Сброс состояния стейта до наального
   * @param state
   */
  resetData (state) {
    Object.assign(state, {
      playerId: '',
      uuid: '',
    })
  },
}

const getters = {
  /**
   * Получение id пользователя
   * @param state
   * @returns {string}
   */
  getPlayerId (state) {
    return state.playerId
  },
  /**
   * Получение uuid пользователя
   * @param state
   * @returns {string}
   */
  getPlayerUuid (state) {
    return state.uuid
  },
}

export default {
  name: 'player',
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
