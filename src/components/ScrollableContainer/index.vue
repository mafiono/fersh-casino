<template>
  <div
    ref="list"
    :class="[styles['scrollable-area'], {
      [styles['mobile']]: isMobile
    }]"
  >
    <div
      ref="area"
      @click.stop="() => {}"
      @ps-scroll-down="handleDown"
      @ps-scroll-up="handleUp"
      @ps-y-reach-end="handleReachDown"
    >
      <slot
        :scrollValueTop="scrollValueTop"
        :scrollValueBottom="scrollValueBottom"
      />
    </div>
  </div>
</template>

<script>
  import PerfectScrollbar from 'perfect-scrollbar'
  import { useStore } from 'vuex'
  import { computed, onMounted, ref, watch } from 'vue'
  import styles from './style.module.scss'

  export default {
    name: 'ScrollableContainer',
    props: {
      reachDownCallback: Function,
    },
    setup (props) {
      const store = useStore()
      const category = computed(() => store.getters['common/getCategory'])
      const isFirstVisitedTab = computed(() => store.getters['common/getIsFirstVisitedTab'])
      const isMobile = computed(() => store.getters['common/getIsMobile'])

      const area = ref(null)
      const list = ref(null)
      // eslint-disable-next-line no-unused-vars
      let ps = null
      const scrollValueTop = ref(null)
      const scrollValueBottom = ref(null)

      onMounted(() => {
        ps = new PerfectScrollbar(area.value, {
          wheelSpeed: 1,
          swipeEasing: true,
          scrollingThreshold: 1500,
          wheelPropagation: false,
          minScrollbarLength: 50,
        })

        area.value.scrollTop = 0

        // установка начальных значений скоролла для расчета статуса "Просмотренно" у сообщения
        const diff = isFirstVisitedTab.value ? 46 : 40
        scrollValueTop.value = area.value.scrollTop
        scrollValueBottom.value = list.value.offsetHeight + diff
      })

      // хэндлер скролла вниз
      // eslint-disable-next-line no-unused-vars
      const handleDown = (event) => {
        scrollValueTop.value = area.value.scrollTop + 45
        scrollValueBottom.value = area.value.scrollTop + area.value.offsetHeight
      }

      // хэндлер скролла вверх
      const handleUp = () => {
        if (!area.value) {
          return
        }
        scrollValueTop.value = area.value.scrollTop + 12
        scrollValueBottom.value = area.value.scrollTop + area.value.offsetHeight
      }

      const handleReachDown = () => {
        props.reachDownCallback()
      }

      // вотчер изменнения фильтра для просткролла списка к началу сообщений
      watch(category, (newValue, oldValue) => {
        if (newValue !== oldValue) {
          scrollValueTop.value = 0
          scrollValueBottom.value = list.value.offsetHeight
          area.value.scrollTop = 0
        }
      })

      return { styles, area, handleDown, handleUp, scrollValueTop, scrollValueBottom, list, handleReachDown, isMobile }
    },
  }
</script>

<style src="../../styles/ps-styles.scss" lang="scss" />
