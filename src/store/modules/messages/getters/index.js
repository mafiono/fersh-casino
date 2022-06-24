import { groupMessagesList } from '@/services'

export default {
  /**
   * Объект сообщений сгруппированых по дате
   * @param state
   * @param getters
   * @param rootGetters
   * @returns {{}}
   */
  getGroupedMessagesList (state, getters, rootGetters) {
    const category = rootGetters.common.category
    const listByCategory = state[`${category}MessagesList`]
    return groupMessagesList(listByCategory)
  },

  /**
   * Возвращает списак для выбраннной категории
   * @param state
   * @return {function(*): *}
   */
  getListByCategory (state) {
    return (category) => {
      return state[`${category}MessagesList`]
    }
  },
  /**
   * Количество не прочитанных системных сообщений
   * @param state
   * @returns {number}
   */
  getSystemBadgeValue (state) {
    return state.systemBadgeValue
  },
  /**
   * Количество не прочитанных промо сообщений
   * @param state
   * @returns {number}
   */
  getPromoBadgeValue (state) {
    return state.promoBadgeValue
  },
  /**
   * Список пришедщих сообщений для попапов
   * @param state
   * @param getters
   * @returns {[]}
   */
  getPopupMessageList (state, getters) {
    return state.popupMessagesList.filter(item => getters.getIsShowMessageInPopup(item))
  },
  /**
   * Определяет нужно ли сообщение показывать в попапе
   * @param state
   * @returns {function(*): boolean}
   */
  // eslint-disable-next-line no-unused-vars
  getIsShowMessageInPopup (state) {
    return (item) => {
      return Boolean(item.important || item.popupOnly)
    }
  },
  /**
   * Значиние offset для запроса списка сообщений
   * @param state
   * @returns {*}
   */
  getCategoryListOffset (state) {
    return (category) => {
      return state[`${category}ListOffset`]
    }
  },
  /**
   * Количесво сообщений у пользователя
   * @param state
   * @param getters
   * @param rootGetters
   * @returns {*}
   */
  getCategoryListLength (state) {
    return (category) => {
      return state[`${category}ListLength`]
    }
  },
  /**
   * Получение статуса загрузки
   * @param state
   * @param getters
   * @param rootGetters
   * @returns {*}
   */
  getListLoadingStatus (state, getters, rootGetters) {
    const category = rootGetters.common.category
    return state[`${category}ListLoadingStatus`]
  },
  /**
   * Список id сообщений на которых нажали удалить
   * @param state
   * @returns {[]}
   */
  getDeletionPendingIds (state) {
    return state.deletionPendingIds
  },
}
