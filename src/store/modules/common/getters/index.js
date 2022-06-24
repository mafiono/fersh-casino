import { FRESH_BASIC_THEME, FRESH_DARK_THEME, IZZI_THEME, JET_THEME, VOLNA_THEME } from '@/constants'

export default {
  /**
   * Имя темы
   * @param state
   * @returns {string}
   */
  getTheme (state) {
    return state.theme
  },

  /**
   * Имя фильтра сообщений
   * @param state
   * @returns {string|FunctionConstructor}
   */
  getCategory (state) {
    return state.category
  },

  /**
   * Получение переводов
   * @param state
   * @return {{}}
   */
  getLocalesString (state) {
    return state.localesString
  },

  /**
   * Получение флага -
   * @param state
   * @returns {boolean}
   */
  getIsFirstVisitedTab (state) {
    return state.isFirstVisitedTab
  },

  /**
   * Флаг что девайс mobile
   * @param state
   * @return {boolean}
   */
  getIsMobile (state) {
    return state.device === 'mobile'
  },

  /**
   * Флаг что девайс tablet
   * @param state
   * @return {boolean}
   */
  getIsTablet (state) {
    return state.device === 'tablet'
  },

  /**
   * Флаг что девайс laptop
   * @param state
   * @return {boolean}
   */
  getIsLaptop (state) {
    return state.device === 'laptop'
  },

  /**
   * Флаг что девайс desktop
   * @param state
   * @return {boolean}
   */
  getIsDesktop (state) {
    return state.device === 'desktop'
  },

  /**
   * Девайс полученный с сайта
   * @param state
   * @return {string}
   */
  getDevice (state) {
    return state.device
  },

  /**
   * Флаг что текущай сайт fresh мобилка
   * @param state
   * @return {boolean}
   */
  getIsFreshMobile (state) {
    const theme = (state.theme === FRESH_BASIC_THEME || state.theme === FRESH_DARK_THEME)
    return Boolean(theme && state.device === 'mobile')
  },

  /**
   * Флаг Izzi сайта
   * @param state
   * @return {boolean}
   */
  getIsIzzi (state) {
    return Boolean(state.theme === IZZI_THEME)
  },

  /**
   * Флаг Jet сайта
   * @param state
   * @return {boolean}
   */
  getIsJet (state) {
    return Boolean(state.theme === JET_THEME)
  },

  /**
   * Флаг Volna сайта
   * @param state
   * @return {boolean}
   */
  getIsVolna (state) {
    return Boolean(state.theme === VOLNA_THEME)
  },

  /**
   * Флаг Fresh в светлой теме сайта
   * @param state
   * @return {boolean}
   */
  getFreshBasic (state) {
    return Boolean(state.theme === FRESH_BASIC_THEME)
  },

  /**
   * Имя ткущего сайта
   * @param state
   * @return {string}
   */
  getSiteName (state) {
    return state.siteName
  },

  /**
   * Флаг открыт ли список сообщений
   * @param state
   * @return {boolean}
   */
  getIsDropDownOpen (state) {
    return state.isDropDownOpen
  },

  /**
   * Флаг перекрыт ли экран устройства модалками сайта
   * @param state
   * @return {boolean}
   */
  isScreenOverlap (state) {
    return (state.isDropDownOpen && state.device === 'mobile') || state.isMobileScreenOverlap
  },

  /**
   *  Значение rem
   * @param state
   * @return {*}
   */
  getSiteRemValue (state) {
    return state.remValue
  },

  /**
   * Получение флага зафиксирован ли хэдер сайта при скроле
   * @param state
   * @return {boolean}
   */
  isSiteHeaderFixed (state) {
    return state.isSiteHeaderFixed
  },
}
