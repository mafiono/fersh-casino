<template>
  <div
    :class="[styles['bell-button'], {
      [styles['mobile']]: isMobile,
      [styles['tablet']]: isTablet,
      [styles['site-header-fixed']]: isHeaderFixed,

    }]"
    :style="dynamicStyles.button"
    @click="clickHandler"
  >
    <BellBadge
      v-if="showBadgeFlag"
      :items-number="badgeValue"
      :device="device"
    />
    <Icon
      :icon-name="`bell-button-${themeName}`"
      :size="icon"
      :dynamic-styles="dynamicStyles.icon"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { getDynamicStyles, getSiteIcons } from '@/services'
import Icon from '@/components/Icon'
import BellBadge from '@/components/BellBadge'
import styles from './style.module.scss'

export default {
  name: 'BellButton',
  components: {
    Icon,
    BellBadge,
  },
  props: {
    themeName: String,
    clickHandler: Function,
    isMobileBottomMenu: Boolean,
    isMobileTopMenu: Boolean,
  },
  setup () {
    const store = useStore()

    const systemBadgeValue = computed(() => store.getters['messages/getSystemBadgeValue'])
    const promoBadgeValue = computed(() => store.getters['messages/getPromoBadgeValue'])

    const theme = computed(() => store.getters['common/getTheme'])
    const isMobile = computed(() => store.getters['common/getIsMobile'])
    const isTablet = computed(() => store.getters['common/getIsTablet'])
    const isLaptop = computed(() => store.getters['common/getIsLaptop'])
    const device = computed(() => store.getters['common/getDevice'])
    const remValue = computed(() => store.getters['common/getSiteRemValue'])
    const isHeaderFixed = computed(() => store.getters['common/isSiteHeaderFixed'])

    const dynamicStyles = computed(() => getDynamicStyles(remValue.value, theme.value, isLaptop.value))
    const icons = computed(() => getSiteIcons(theme.value, isMobile.value, isLaptop.value))

    const icon = computed(() => {
      switch (device.value) {
        case 'mobile':
          return icons.value.bellIconMobileSize
        case 'tablet':
          return icons.value.bellIconTabletSize
        case 'laptop':
          return icons.value.bellIconLaptopSize
        default: return 'size-24'
      }
    })

    const badgeValue = computed(() => {
      const sum = systemBadgeValue.value + promoBadgeValue.value
      return sum > 99 ? '99+' : sum
    })

    const showBadgeFlag = computed(() => {
      return Boolean(systemBadgeValue.value + promoBadgeValue.value)
    })

    return { styles, badgeValue, icon, isMobile, isTablet, dynamicStyles, isHeaderFixed, showBadgeFlag, device }
  },
}
</script>
