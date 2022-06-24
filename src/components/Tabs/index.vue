<template>
  <div
    :class="[styles['tabs'], {
      [styles['mobile']]: isMobile
    }]"
    @click.stop="() => {}"
  >
    <div
      v-for="tab in TABS"
      :key="tab.key"
      :class="[styles['item'], {
        [styles['active']]: tab.key === category
      }]"
      @click.stop="setActiveTab(tab.key, tab.analytics_click_id)"
    >
      <div
        v-if="Boolean(getBadgeValue(tab.key))"
        :class="styles['badge']"
      >
        {{ getBadgeValue(tab.key) }}
      </div>
      <div :class="styles['label']">
        {{ $t(`tabs.${tab.key}`) }}
      </div>
      <div
        :class="[styles['border'], {
          [styles['active']]: tab.key === category
        }]"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { analyticClickEvent } from '@/services'
import { TABS, SYSTEM } from '@/constants'
import styles from './style.module.scss'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Tabs',
  setup () {
    const store = useStore()

    const setCategory = (value) => store.dispatch('common/setCategory', value)
    const changeFirstVisitedTabFlag = (value) => store.dispatch('common/setIsFirstVisitedTab', value)
    const isMobile = computed(() => store.getters['common/getIsMobile'])
    const category = computed(() => store.getters['common/getCategory'])
    const systemBadgeValue = computed(() => store.getters['messages/getSystemBadgeValue'])
    const promoBadgeValue = computed(() => store.getters['messages/getPromoBadgeValue'])

    const setActiveTab = async (tabName, clickId) => {
      analyticClickEvent(clickId)
      await setCategory(tabName)
      await changeFirstVisitedTabFlag(false)
    }

    const getBadgeValue = (tabName) => {
      return tabName === SYSTEM
        ? systemBadgeValue.value
        : promoBadgeValue.value
    }

    return { styles, TABS, setActiveTab, category, getBadgeValue, isMobile }
  },
}
</script>
