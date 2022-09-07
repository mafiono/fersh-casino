import { computed, createApp } from 'vue'
import to from 'await-to-js'
import { getPlayerSettings } from '@/api/helpers/addAuthHeader'
import { setJWT } from '@/storage/localStorage/jwtMethods'
import App from './App.vue'
import store from './store'
import { i18n } from './i18n'
import clickOutside from './directives/index'
import { MESSENGER_ATTRIBUTES, TABS } from './constants/index'
import { setLoadedLocales, setLoadedMessagesData } from './services/groupMessagesList'

let app

class MicroFrontendMessenger extends HTMLElement {
  static get observedAttributes () {
    return MESSENGER_ATTRIBUTES
  }

  disconnectedCallback () {
    // отдельно обнуляем playerId для закрытия сокет соединения при разлогине
    store.dispatch('player/setPlayerId', '')

    Object.keys(store.state).forEach(key => {
      store.commit(`${key}/resetData`)
    })
  }

  async attributeChangedCallback (name, oldValue, newValue) {
    setTimeout(async () => {
      switch (name) {
        case 'site-name':
          return store.dispatch('common/setSiteName', newValue)
        case 'theme':
          return store.dispatch('common/setTheme', newValue)
        case 'device':
          return store.dispatch('common/setDeviceType', newValue)
        case 'mobile-screen-overlap-flag':
          return store.dispatch('common/setMobileScreenOverlap', Boolean(JSON.parse(newValue)))
        case 'rem-value':
          return store.dispatch('common/setSiteRem', newValue)
        case 'is-site-header-fixed':
          return store.dispatch('common/setSiteHeaderFixed', Boolean(JSON.parse(newValue)))
        case 'uuid':
          return store.dispatch('player/setPlayerUuid', newValue)
        case 'lang':
          return setLoadedLocales(newValue)
        case 'player-id':
          return await setLoadedMessagesData(newValue)
      }
    }, 0)
  }

  constructor () {
    super()
    app = createApp(App)
      .use(store)
      .use(i18n)
      .directive('clickOutside', clickOutside)

    app.mount('#micro-app-messenger')
  }
}

window.addEventListener('messenger-micro-app-loaded', async () => {
  const [, data] = await to(getPlayerSettings())
  const token = data.data.messenger.token
  setJWT(token)

  if (!window.customElements.get('micro-app-messenger')) {
    window.customElements.define('micro-app-messenger', MicroFrontendMessenger)
  } else {
    app = createApp(App)
      .use(store)
      .use(i18n)
      .directive('clickOutside', clickOutside)

    app.mount('#micro-app-messenger')
  }
})

/**
 * Важное условие для корректного маунтинга апки при смене разрешения
 */
window.addEventListener('messenger-micro-app-destroy', () => {
  app.unmount()
})

/**
 * Отслеживание ухода пользователя с табы
 */

let timeoutLink = null
document.addEventListener('visibilitychange', async () => {
  const profileId = computed(() => store.getters['player/getPlayerId'])
  if (!profileId.value) {
    return
  }

  if (document.hidden) {
    // закрываем список сообщений, чтобы не было проблем при загрузке начального списка,
    // при возможности, что список был спагинирован
    setTimeout(() => { store.dispatch('common/toggleDropDownOpen', false) }, 0)

    timeoutLink = setTimeout(() => {
      clearTimeout(timeoutLink)
      store.dispatch('common/setTabVisibility', false)
      timeoutLink = null
    }, 60000)
  } else {
    clearTimeout(timeoutLink)
    if (!timeoutLink) {
      store.dispatch('common/setTabVisibility', true)

      const arr = []
      for (const tab of TABS) {
        arr.push(store.dispatch('messages/loadUnreadMessagesCount', tab.key))
        arr.push(store.dispatch('messages/loadMessages', { category: tab.key }))
      }
      await Promise.all(arr)
    }
  }
})

/**
 *  Подключение для локальной разработки
 * @type {App<Element>}
 */

app = createApp(App)
   .use(store)
   .use(i18n)
   .directive('clickOutside', clickOutside)

 app.mount('#micro-app-messenger')

 store.dispatch('common/setTheme', 'fresh-basic')
 store.dispatch('common/setSiteName', 'fresh')
 store.dispatch('player/setPlayerId', 2326453)
 store.dispatch('player/setPlayerUuid', '56253-2323-23232-2399')

 TABS.forEach(tab => {
   store.dispatch('messages/loadUnreadMessagesCount', tab.key)
   store.dispatch('messages/loadMessagesList', tab.key)
 })
