import { getLocalesString } from '@/api/helpers/createQueryParams'
import to from 'await-to-js'

/**
 * Установка темы для микроприложения
 * @param state
 * @param commit
 * @param payload {
 *   string,
 *  'default'|
 *  'sol'|
 *  'fresh-basic'|
 *  'fresh-dark'|
 *  'jet'|
 *  'rox'|
 *  'volna'
 *  } - название темы
 */
export default {
  /**
   * Сохранение имени темы
   * @param state
   * @param commit
   * @param payload
   */
  setTheme ({ state, commit }, payload) {
    commit('setThemeValue', payload || state.theme)
  },
  /**
   * Сохранение типа устройства
   * @param state
   * @param commit
   * @param payload
   */
  setDeviceType ({ state, commit }, payload) {
    commit('setDeviceTypeValue', payload || state.device)
  },

  /**
   * Установка фильтра для сообщение
   * @param state
   * @param commit
   * @param payload - {string, SYSTEM|PROMO} - имя выбранного фильтра
   */
  setCategory ({ state, commit }, payload) {
    commit('setCategoryValue', payload || state.category)
  },

  /**
   * Установка языка
   * @param state
   * @param commit
   * @param payload {string} имя локали
   */
  setLanguage ({ state, commit }, payload) {
    commit('setLanguageValue', payload || state.language)
  },

  /**
   * Загрузка переводов для локали
   * @param state
   * @param commit
   * @param payload
   * @return {Promise<void>}
   */
  async loadLocales ({ state, commit }, payload) {
    const [, data] = await to(getLocalesString(payload || state.language))

    commit('loadLocalesString', data)
  },

  /**
   * Изменение статуса флага первой просмотренной таб после откртия
   * @param state
   * @param commit
   * @param payload {boolean}
   */
  // eslint-disable-next-line no-unused-vars
  setIsFirstVisitedTab ({ state, commit }, payload) {
    commit('setIsFirstVisitedTabFlag', payload)
  },

  /**
   * Сохранение имени сайта
   * @param state
   * @param commit
   * @param payload
   */
  // eslint-disable-next-line no-unused-vars
  setSiteName ({ state, commit }, payload) {
    commit('setSiteNameValue', payload)
  },

  /**
   * Сохранение флага открытого списка сообщений
   * @param state
   * @param commit
   * @param payload
   */
  // eslint-disable-next-line no-unused-vars
  toggleDropDownOpen ({ state, commit }, payload) {
    commit('toggleDropDownOpenFlag', payload)
  },

  /**
   * Сохранение флага перекрыт ли экран моб устройста модалкой самого сайта
   * @param state
   * @param commit
   * @param payload
   */
  // eslint-disable-next-line no-unused-vars
  setMobileScreenOverlap ({ state, commit }, payload) {
    commit('setMobileScreenOverlapFlag', payload)
  },

  /**
   * Сохранение значения rem сайта для определенных разрешений
   * @param state
   * @param commit
   * @param payload
   */
  // eslint-disable-next-line no-unused-vars
  setSiteRem ({ state, commit }, payload) {
    commit('setSiteRemValue', payload)
  },

  /**
   * Установка флага зафиксирован ли хэдер сайта при скроле
   * @param state
   * @param commit
   * @param payload
   */
  // eslint-disable-next-line no-unused-vars
  setSiteHeaderFixed ({ state, commit }, payload) {
    commit('setSiteHeaderFixedFlag', payload)
  },

  /**
   * Установка флага состояния активности табы
   * @param state
   * @param commit
   * @param {boolean} payload
   */
  // eslint-disable-next-line no-unused-vars
  setTabVisibility ({ state, commit }, payload) {
    commit('setTabVisibilityFlag', payload)
  },
}
