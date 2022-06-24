// список атрибутов ожибаемых месссенджером
export const MESSENGER_ATTRIBUTES = [
  'device',
  'is-site-header-fixed',
  'lang',
  'mobile-screen-overlap-flag',
  'player-id',
  'rem-value',
  'site-name',
  'theme',
  'uuid',
]

// названия тем
export const SOL_THEME = 'sol'
export const FRESH_BASIC_THEME = 'fresh-basic'
export const FRESH_DARK_THEME = 'fresh-dark'
export const JET_THEME = 'jet'
export const IZZI_THEME = 'izzi'
export const ROX_THEME = 'rox'
export const VOLNA_THEME = 'volna'

// названия периодов дат
export const TODAY = 'today'
export const YESTERDAY = 'yesterday'
export const PREVIOUSLY = 'previously'

export const SYSTEM = 'system'
export const PROMO = 'promo'
export const BACKGROUND = 'background'
export const NEW_STATUS = 'new'

export const LOAD_DATA_LIMIT_VALUE = 20

export const TABS = [
  {
    key: PROMO,
    analytics_click_id: 'popup-messenger-offers',
  },
  {
    key: SYSTEM,
    analytics_click_id: 'popup-messenger-system',
  },
]

export const CONTROLS = [
  {
    key: 'clear',
    action: 'deleteAllMessages',
    analytics_click_id: 'popup-messenger-clear_all',
  },
  {
    key: 'read',
    action: 'readAllMessages',
    analytics_click_id: 'popup-messenger-read_all',
  },
]

// инлайновые стили для сохранения значения прокрутки при открытия мессенджера на мобилке
export const pageStylesAfterMobileView = {
  overflow: 'initial',
  position: 'initial',
  left: 'initial',
  right: 'initial',
  top: 'initial',
  bottom: 'initial',
  height: 'initial',
  marginTop: '0',
}

export const pageStylesForScrollBlock = {
  overflow: 'hidden',
  position: 'fixed',
  left: '0',
  right: '0',
  top: '0',
  bottom: '0',
}

export class BASE_URL {
}

export class BASE_API_URL_V1 {
}

export class COMMON_HEADERS {
}

export class instance {
}

export class instanceNoCredentials {
  // eslint-disable-next-line no-unused-vars
  static async get(url) {

  }
}