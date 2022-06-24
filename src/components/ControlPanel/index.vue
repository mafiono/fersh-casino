<template>
  <div :class="styles['controls-panel']">
    <div
      v-for="control in CONTROLS"
      :key="control.key"
      :class="[styles['control'], {
        [styles['anim-bg-position']]: isIzzi
      }]"
      @click.stop="handleClick(control.action, control.analytics_click_id )"
      v-html="$t(`controls.${control.key}`)"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { analyticClickEvent } from '@/services'
import { CONTROLS } from '@/constants'
import styles from './style.module.scss'

export default {
  name: 'ControlsPanel',
  props: {
    category: String,
  },
  setup (props) {
    const store = useStore()
    const isIzzi = computed(() => store.getters['common/getIsIzzi'])

    const handleClick = (action, clickId) => {
      analyticClickEvent(clickId, { place: props.category === 'promo' ? 'Offers' : 'System' })
      store.dispatch(`messages/${action}`)
    }
    return { styles, isIzzi, CONTROLS, handleClick }
  },
}
</script>
