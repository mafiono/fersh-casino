<template>
  <div
    ref="app"
    v-clickOutside
    :class="[
      styles[theme],
      styles['root'],
      styles[`${device}`],
    ]"
  >
    <BellButton
      v-if="playerId"
      :click-handler="toggleListOpen"
      :theme-name="theme"
    />
    <DropDownContainer
      v-if="dropDownOpened"
      :bell-height="app && app.offsetHeight"
      :close-drop-down="(param) => closeDropDown('Cross')"
    />
    <PopupMessage
      v-for="(message, index) in popupMessagesList"
      :key="message.id"
      :index="popupMessagesList.length - index"
      :message="message"
      :popup-messages-list="popupMessagesList"
    />
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { analyticClickEvent, detectRoxDevice, detectVulkanDevice } from './services'
import { ROX_THEME, VOLNA_THEME, pageStylesAfterMobileView, pageStylesForScrollBlock } from './constants'
import BellButton from './components/BellButton'
import DropDownContainer from './components/DropDownContainer'
import PopupMessage from './components/PopupMessage'
import styles from './styles/main.module.scss'
import './styles/init-visibility.scss'

export default {
  name: 'App',
  components: {
    BellButton,
    DropDownContainer,
    PopupMessage,
  },
  setup () {
    const store = useStore()
    const app = ref(null)
    const theme = computed(() => store.getters['common/getTheme'])
    const playerId = computed(() => store.getters['player/getPlayerId'])
    const isMobile = computed(() => store.getters['common/getIsMobile'])
    const device = computed(() => store.getters['common/getDevice'])
    const dropDownOpened = computed(() => store.getters['common/getIsDropDownOpen'])
    const popupMessagesList = computed(() => store.getters['messages/getPopupMessageList'])
    const toggleDropDownOpen = (value) => store.dispatch('common/toggleDropDownOpen', value)
    const setDevice = (value) => store.dispatch('common/setDeviceType', value)
    const setCategory = (value) => store.dispatch('common/setCategory', value)
    const changeFirstVisitedTabFlag = (value) => store.dispatch('common/setIsFirstVisitedTab', value)

    /**
     * Сброс блокировки прокрутки страницы при переходе из мобильного вида
     */
    watch(isMobile, (newValue, oldValue) => {
      if (!newValue && oldValue && theme.value !== ROX_THEME && theme.value !== VOLNA_THEME) {
        Object.assign(document.body.style, pageStylesAfterMobileView)
      }
    })

    watch(theme, (newValue) => {
      if (newValue === ROX_THEME) {
        setDevice(detectRoxDevice())
      }
      if (newValue === VOLNA_THEME) {
        setDevice(detectVulkanDevice())
      }
    })

    onMounted(() => {
      window.addEventListener('resize', onResize, { passive: true })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    const onResize = () => {
      if (theme.value === ROX_THEME) {
        setDevice(detectRoxDevice())
      }
      if (theme.value === VOLNA_THEME) {
        setDevice(detectVulkanDevice())
      }
    }
    const toggleListOpen = async () => {
      await toggleDropDownOpen(!dropDownOpened.value)

      window.dispatchEvent(new CustomEvent('trigger-messenger-opened-state', { detail: dropDownOpened.value }))

      dropDownOpened.value
          ? analyticClickEvent('top-menu-bell')
          : analyticClickEvent('popup-messenger-close', { method: 'Bell' })

      updatePageStyles()

      if (!dropDownOpened.value) {
        await setCategory('promo')
      }
      await changeFirstVisitedTabFlag(dropDownOpened.value)
    }

    const closeDropDown = (param) => {
      analyticClickEvent('popup-messenger-close', { method: param })
      
      toggleDropDownOpen(false)
      window.dispatchEvent(new CustomEvent('trigger-messenger-opened-state', { detail: false }))

      setCategory('promo')
      updatePageStyles()
    }

    /**
     * Блокировка прокрутки страницы сайта при открытом списке сообщений на мобилке
     */
    const updatePageStyles = () => {
      if (isMobile.value) {
        const savedScrollValue = parseInt(document.body.style.marginTop)

        if (dropDownOpened.value) {
          // навешивание стиелей на HTML тэг для фикса появления полоски у айфонов при уменьшении поисковой строки
          document.documentElement.style.height = `${window.innerHeight}px`

          return Object.assign(document.body.style, {
            ...pageStylesForScrollBlock,
            ...{ marginTop: `-${window.scrollY}px` },
          })
        }
        document.documentElement.style.height = 'initial'
        Object.assign(document.body.style, pageStylesAfterMobileView)
        window.scrollTo(0, -savedScrollValue)
      }
    }

    return {
      styles,
      dropDownOpened,
      theme,
      popupMessagesList,
      playerId,
      isMobile,
      device,
      app,
      closeDropDown,
      toggleListOpen,
    }
  },
}
</script>
