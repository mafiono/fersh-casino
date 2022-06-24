import getters from '../getters'
import { defaultState } from '../state'

export default {
  /**
   * Сохранение сообщений при первой загрузке в соответствующие категории массивы
   * @param state
   * @param payload
   */
  saveMessagesData (state, payload) {
    const { messages, category } = payload
    state[`${category}MessagesList`] = messages
  },
  /**
   * Сохранение сообщений при пагинации в соответствующие категории массивы
   * @param state
   * @param payload
   */
  savePaginatedMessagesData (state, payload) {
    const { messages, category } = payload
    const list = state[`${category}MessagesList`]
    const listMessagesIds = list.map(item => item.message.id)
    const uniqueMessages = messages.filter(item => listMessagesIds.includes(item.message.id))

    state[`${category}MessagesList`] = [...list, ...uniqueMessages]
  },
  /**
   * Добавление сообщения в начало списка
   * @param state
   * @param payload {object}
   */
  addMessageToList (state, payload) {
    if (payload.popupOnly) {
      return
    }
    const category = payload.category

    // проверка на наличие дубля для редкого кейса пересеяения загрузок списка и отдельного сообщения
    const duplicateItem = state[`${category}MessagesList`].some(item => item.message.id === payload.message.id)

    if (!duplicateItem) {
      state[`${category}MessagesList`] = [payload, ...state[`${category}MessagesList`]]
      state[`${payload.category}BadgeValue`] += 1
    }
  },
  /**
   * Сохранение обновленного значения не прочитанных сообщений
   * @param state
   * @param payload {object}
   */
  setBadgesValues (state, payload) {
    const { category, count } = payload
    state[`${category}BadgeValue`] = count
  },

  /**
   * Уменьшение значение числа непрочитанных в категории
   * @param state
   * @param category {string}
   */
  decrementBadgesValue (state, category) {
    if (state[`${category}BadgeValue`]) {
      state[`${category}BadgeValue`] -= 1
    }
  },
  /**
   * Умвеличение значения числа непрочитанных в категории
   * @param state
   * @param payload {object}
   */
  incrementBadgesValue (state, payload) {
    if (payload.popupOnly) {
      return
    }
    state[`${payload.category}BadgeValue`] += 1
  },
  /**
   * Изменение статуса для сообщения
   * @param state
   * @param payload { {id: string|number, category: string} } - id сообщения и имя устанавливаемого статуса
   */
   setMessageReadStatus (state, { id, category }) {
    const messagesList = [...state[`${category}MessagesList`]]
    state[`${category}MessagesList`] = messagesList.map((item) => {
      if (item.message.id === id) {
        return {
          ...item,
            message: {
            ...item.message,
            readStatus: true,
          },
        }
      }
      return item
    })
  },
  /**
   * Изменение статуса всех сообщений на "Прочитано"
   * @param state
   * @param category {string}
   */
  readAllCategoryMessages (state, category) {
    const messagesList = [...state[`${category}MessagesList`]]
    state[`${category}MessagesList`] = messagesList.map((item) => {
      return {
        ...item,
        message: {
          ...item.message,
          readStatus: true,
        },
      }
    })
  },
  /**
   * Удаление конкретного сообщения из списка
   * @param state
   * @param payload { {id: string|number, category: string} }
   */
  deleteMessageItem (state, { id, category }) {
    const index = state[`${category}MessagesList`].findIndex(item => item.message.id === id)
    state[`${category}MessagesList`].splice(index, 1)
  },
  /**
   * Удаление всех сообщений из списка
   * @param state
   *  @param category {string}
   */
  deleteAllCategoryMessages (state, category) {
    state[`${category}MessagesList`] = []
  },
  /**
   * Добавление собщения с флагом important в список попап сообщений
   * @param state
   * @param payload
   */
  updatePopupMessagesList (state, payload) {
    // проверка на наличие дубля для редкого кейса пересеяения загрузок списка и отдельного сообщения
    const duplicateItem = state.popupMessagesList.some(item => item.message.id === payload.message.id)
    
    if (getters.getIsShowMessageInPopup(payload) && !duplicateItem) {
      state.popupMessagesList = [payload, ...state.popupMessagesList]
    }
  },
  /**
   * Закрытие отдельного сообщения в попапе
   * @param state
   * @param id
   */
  closeSingleMessageItem (state, id) {
    const popupMessagesList = [...state.popupMessagesList]
    state.popupMessagesList = popupMessagesList.map((item) => {
      if (item.id === id) {
        if (item.important) {
          return {
            ...item, important: false,
          }
        }
        if (item.popupOnly) {
          return {
            ...item, popupOnly: false,
          }
        }
      }
      return item
    })
  },

  /**
   * Установка значения offset для запроса списка
   * @param state
   * @param payload
   */
  setLoadDataOffset (state, payload) {
    const { category, value } = payload
    state[`${category}ListOffset`] = value
  },
  /**
   * Установка общей длины списка пользователя
   * @param state
   * @param payload
   */
  setCategoryListLength (state, payload) {
    const { category, count } = payload
    state[`${category}ListLength`] = count
  },
  /**
   * Установка флага загрузки
   * @param state
   * @param payload
   */
  setListLoadingStatus (state, payload) {
    const { category, status } = payload
    state[`${category}ListLoadingStatus`] = status
  },

  /**
   * Добавление id сообщения в список ожидающих удаления сообщений
   * Поле нужно для последующей блокировки лишних вызовов удаления и уменьшения значения непрочитанных
   * @param state
   * @param payload
   */
  addToDeletionPendingList (state, payload) {
    state.deletionPendingIds = [...state.deletionPendingIds, payload]
  },
  /**
   * Уменьшение значения offset
   * @param state
   * @param category
   */
  decrementOffsetValue (state, category) {
    if (state[`${category}ListOffset`]) {
      state[`${category}ListOffset`] -= 1
    }
  },
  /**
   * Сброс состояния стейта до наального
   * @param state
   */
  resetData (state) {
    Object.assign(state, defaultState)
  },
}
