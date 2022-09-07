import to from 'await-to-js'
import {
  getMessagesListByCategory,
  getUnreadMessagesCount,
  setReadEvent,
  setReadAllEvent,
  setDeleteEvent,
  setDeleteAllEvent,
  setDeliveryGroupEvent,
} from '@/api/helpers/createQueryParams'
import { LOAD_DATA_LIMIT_VALUE } from '@/constants'
import store from '@/store'

export default {

  // eslint-disable-next-line no-unused-vars
  async loadMessages ({ state, commit, getters, rootGetters }, { category, offset = 0 }) {
    const playerId = rootGetters['player/getPlayerId']
    const serverCodename = rootGetters['common/getSiteName']

    commit('setListLoadingStatus', { status: true, category })

    const [error, data] = await to(getMessagesListByCategory({
      category,
      playerId,
      limit: LOAD_DATA_LIMIT_VALUE,
      offset,
      serverCodename,
    }))

    commit('setListLoadingStatus', { status: false, category })

    if (error) {
      commit('saveMessagesData', { messages: [], category })
    } else {
      const { messages, count } = data

      offset
        ? commit('savePaginatedMessagesData', { messages, category })
        : commit('saveMessagesData', { messages, category })
      commit('setCategoryListLength', { count, category })
      commit('setLoadDataOffset', { category, value: LOAD_DATA_LIMIT_VALUE + offset })

      // помечаем загруженные сообщения как доставленные
      await setDeliveryGroupEvent(messages)
    }
  },

  /**
   * Загрузка общего списка сообщений
   * @param state
   * @param commit
   * @param getters
   * @param rootGetters
   * @param {string} category
   */
  // eslint-disable-next-line no-unused-vars
  async loadPaginatedMessages ({ state, commit, getters, rootGetters }, category) {
    const offset = getters.getCategoryListOffset(category)
    const listLength = getters.getCategoryListLength(category)

    // условие для избежания лишних запросов при скроле
    if (listLength !== null && offset >= listLength) {
      return
    }

    store.dispatch('messages/loadMessages', { category, offset })
  },

  /**
   * Загрузка количества непрочитанных сообщений по категориям
   * @param state
   * @param commit
   * @param rootGetters
   * @param {string} listCategory
   */
  // eslint-disable-next-line no-unused-vars
  async loadUnreadMessagesCount ({ state, commit, rootGetters }, listCategory) {
    const playerId = rootGetters['player/getPlayerId']
    const category = listCategory || rootGetters['common/getCategory']
    const serverCodename = rootGetters['common/getSiteName']
    const [, data] = await to(getUnreadMessagesCount(category, playerId, serverCodename))

    if (data) {
      commit('setBadgesValues', data)
    }
  },
  /**
   * добавление нового сообщения в список
   * @param state
   * @param commit
   * @param rootGetters
   * @param payload {Object}
   */
  // eslint-disable-next-line no-unused-vars
  async updateMessagesList ({ state, commit, rootGetters }, payload) {
    // при активной сесии прилетело сообщение по сокету
    commit('addMessageToList', payload)
    // commit('incrementBadgesValue', payload)

    // помечаем как доставленное
    await setDeliveryGroupEvent([payload])

    if (!rootGetters['common/isScreenOverlap']) {
      commit('updatePopupMessagesList', payload)
    }
  },
  /**
   * Изменение статуса для сообщения
   * @param state
   * @param commit
   * @param payload {{id: string|number, category: string}} - id сообщения и имя устанавливаемого статуса
   */
  // eslint-disable-next-line no-unused-vars
  async markMessageRead ({ state, commit }, payload) {
    const [error] = await to(setReadEvent(payload.id))
    if (!error) {
      commit('setMessageReadStatus', payload)
      commit('decrementBadgesValue', payload.category)
    }
  },
  /**
   * Изменение статуса всех сообщений на "Прочитано"
   * @param commit
   * @param rootGetters
   */
  async readAllMessages ({ commit, rootGetters }) {
    const category = rootGetters['common/getCategory']
    const uuid = rootGetters['player/getPlayerUuid']
    const [error] = await to(setReadAllEvent(uuid, category))

    if (!error) {
      commit('readAllCategoryMessages', category)
      commit('setBadgesValues', { category, count: 0 })
    }
  },
  /**
   * Удаление конкретного сообщения из списка
   * @param state
   * @param commit
   * @param payload {{id: string|number, category: string}} - id сообщения
   */
  // eslint-disable-next-line no-unused-vars
  async deleteMessage ({ state, commit }, payload) {
    commit('addToDeletionPendingList', payload.id)

    const [error] = await to(setDeleteEvent(payload.id))

    if (!error) {
      commit('deleteMessageItem', payload)
      commit('decrementOffsetValue', payload.category)
    }
  },
  /**
   * Удаление всех сообщений из списка
   * @param commit
   * @param rootGetters
   */
  async deleteAllMessages ({ commit, rootGetters }) {
    const category = rootGetters['common/getCategory']
    const uuid = rootGetters['player/getPlayerUuid']
    const [error] = await to(setDeleteAllEvent(uuid, category))

    if (!error) {
      commit('deleteAllCategoryMessages', category)
      commit('setBadgesValues', { category, count: 0 })
    }
  },
  /**
   * Скрыть сообщение в попапе
   * @param state
   * @param commit
   * @param payload
   */
  // eslint-disable-next-line no-unused-vars
  closeSingleMessage ({ state, commit }, payload) {
    // тут потом будет лететь запрос
    commit('closeSingleMessageItem', payload)
  },
}
