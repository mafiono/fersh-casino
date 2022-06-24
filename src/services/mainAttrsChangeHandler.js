import { i18n } from '@/i18n'
import store from '@/store'
import { computed } from 'vue'
import { TABS } from '@/constants'
import { analyticAvailableEvent } from './analytics'

export const setLoadedLocales = (value) => {
  i18n.global.locale = value

  store.dispatch('common/setLanguage', value)
  store.dispatch('common/loadLocales', value).then(() => {
    const localesString = computed(() => store.getters['common/getLocalesString'])
    i18n.global.setLocaleMessage(value, localesString.value)
  })
}

export const setLoadedMessagesData = async (value) => {
  const id = parseInt(value)
  if (!id) {
    return
  }

  await store.dispatch('player/setPlayerId', id)

  const arr = []
  for (const tab of TABS) {
    arr.push(store.dispatch('messages/loadUnreadMessagesCount', tab.key))
    arr.push(store.dispatch('messages/loadMessages', { category: tab.key }))
  }
  await Promise.all(arr)

  const promoListLength = computed(() => store.getters['messages/getCategoryListLength']('promo'))
  const promoUnread = computed(() => store.getters['messages/getPromoBadgeValue'])

  const systemListLength = computed(() => store.getters['messages/getCategoryListLength']('system'))
  const systemUnread = computed(() => store.getters['messages/getSystemBadgeValue'])

  const messengerElem = document.querySelector('#micro-app-messenger')
  if (!messengerElem.offsetParent) {
    return
  }
  analyticAvailableEvent('top-menu-bell',
    {
      count_offers: promoListLength.value,
      unread_offers: promoUnread.value,
      count_system: systemListLength.value,
      unread_system: systemUnread.value,
    },
  )
}
