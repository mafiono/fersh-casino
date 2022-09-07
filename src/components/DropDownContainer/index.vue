<template>
  <div
    ref="dropdownElem"
    :class="[styles['dropdown'], styles[`${device}`]]"
  >
    <div
      :class="[styles['container'], {
        [styles['mobile']]: isMobile,
      }]"
    >
      <div
        :class="[styles['close'], {
          [styles['outside']]: isMobileOutside,
        }]"
        @click="closeDropDown"
      >
        <Icon
          :icon-name="icons.closeDropDownIconName"
          :size="icons.closeDropDownIconSize"
        />
      </div>
      <Tabs />
      <ScrollableContainer
        v-slot="slotProps"
        :reach-down-callback="handleReachDown"
      >
        <MessagesList
          :scroll-value-top="slotProps.scrollValueTop"
          :scroll-value-bottom="slotProps.scrollValueBottom"
        />
      </ScrollableContainer>
      <ControlsPanel
        :category="category"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import debounce from 'lodash.debounce'
import { getSiteIcons, analyticAvailableEvent, recalculateDropDownHeight } from '@/services/siteicons'
import Tabs from '@/components/Tabs'
import Icon from '@/components/Icon'
import ControlsPanel from '@/components/ControlsPanel'
import MessagesList from '@/components/MessagesList'
import ScrollableContainer from '@/components/ScrollableContainer'
import styles from './style.module.scss'

export default {
  name: 'DropDownContainer',
  components: {
    Tabs,
    ControlsPanel,
    MessagesList,
    Icon,
    ScrollableContainer,
  },
  props: {
    msg: String,
    theme: String,
    closeDropDown: Function,
    bellHeight: Number,
  },

  setup (props) {
    const store = useStore()

    const dropdownElem = ref(null)
    const theme = computed(() => store.getters['common/getTheme'])
    const category = computed(() => store.getters['common/getCategory'])
    const isMobile = computed(() => store.getters['common/getIsMobile'])
    const device = computed(() => store.getters['common/getDevice'])
    const icons = computed(() => getSiteIcons(theme.value, isMobile.value))
    const listByCategory = ref(computed(() => store.getters['messages/getListByCategory'](category.value)))
    const isMobileOutside = computed(() => store.getters['common/getIsFreshMobile'])

    const loadPaginatedMessages = () => store.dispatch('messages/loadPaginatedMessages', category.value)

    // условие для загрузки данных, в случае если пользователь удалили много сообщений
    // и не отработало событие загрузки по скроллу
    watch(() => listByCategory.value.length, async (newValue, oldValue) => {
      if (newValue !== oldValue && newValue < 3) {
        await loadPaginatedMessages()
      }
    })

    onMounted(() => {
      analyticAvailableEvent('popup-messenger')
      recalculateDropDownHeight(dropdownElem.value, props.bellHeight, isMobile.value, theme.value)
      window.addEventListener('resize', debounce(onResize, 100))
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    /**
     * Хэндл ресайза для мобилки при появлении нижней полосы управления
     * или смены ориентации экрана для коррексной отсовки высоты списка сообщений
     */
    const onResize = () => {
      recalculateDropDownHeight(dropdownElem.value, props.bellHeight, isMobile.value, theme.value)
    }

    /**
     * Хэндл прокрутки до конца списка и вызов пагинации
     */
    const handleReachDown = async () => {
      await loadPaginatedMessages()
    }

    return { category, dropdownElem, device, isMobile, icons, isMobileOutside, styles, handleReachDown }
  },
}
</script>
