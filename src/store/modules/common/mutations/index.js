import { defaultState } from '../state'

export default {
  /**
   * Сохранение темы
   * @param state
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
  setThemeValue (state, payload) {
    state.theme = payload
  },

  /**
   * Сохранение типа устройства
   * @param state
   * @param payload
   */
  setDeviceTypeValue (state, payload) {
    state.device = payload
  },

  /**
   * Сохранение фильтра для сообщений
   * @param state
   * @param payload - {string, SYSTEM|PROMO} - имя выбранного фильтра
   */
  setCategoryValue (state, payload) {
    state.category = payload
  },

  /**
   * Соранение локали
   * @param state
   * @param payload {string} имя локали
   */
  setLanguageValue (state, payload) {
    state.language = payload
  },

  /**
   * Сохранение переводов для локали
   * @param state
   * @param payload
   */
  loadLocalesString (state, payload) {
    state.localesString = payload
  },

  /**
   * Изменение статуса флага первой просмотренной таб после откртия
   * @param state
   * @param payload {boolean}
   */
  setIsFirstVisitedTabFlag (state, payload) {
    state.isFirstVisitedTab = payload
  },

  /**
   * Имя сайта (нужно для запросов)
   * @param state
   * @param payload
   */
  setSiteNameValue (state, payload) {
    state.siteName = payload
  },

  /**
   * Флаг открытого списка сообщений
   * @param state
   * @param payload
   */
  toggleDropDownOpenFlag (state, payload) {
    state.isDropDownOpen = payload
  },

  /**
   * Флаг перекрыт ли экран моб устройста модалкой самого сайта
   * @param state
   * @param payload
   */
  setMobileScreenOverlapFlag (state, payload) {
    state.isMobileScreenOverlap = payload
  },

  /**
   * Установка значения rem, которое пришло с сайта для определенных разрешений
   * @param state
   * @param payload
   */
  setSiteRemValue (state, payload) {
    state.remValue = payload
  },

  /**
   * Установка флага зафиксирован ли хэдер сайта при скроле
   * @param state
   * @param payload
   */
  setSiteHeaderFixedFlag (state, payload) {
    state.isSiteHeaderFixed = payload
  },
  /**
   * Сброс состояния стейта до наального
   * @param state
   */
  resetData (state) {
    Object.assign(state, defaultState)
  },

  /**
   * Установка флага состояния активности табы
   * @param state
   * @param {boolean} payload
   */
  setTabVisibilityFlag (state, payload) {
    state.isTabVisible = payload
  },
}
