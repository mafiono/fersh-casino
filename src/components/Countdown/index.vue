<template>
  <div
    v-if="ttlShowTimer"
    :class="[styles['countdown'], {
      [styles['inactive']]: isEndTimer,
    }]"
  >
    <div
      v-if="label"
      :class="styles['label']"
    >
      {{ label }}
    </div>
    <div :class="styles['container']">
      <div :class="styles['item']">
        <div :class="styles['time-count']">
          {{ formDate.days }}
        </div>
        <div :class="styles['time-label']">
          {{ $tc(shortLabel ? 'ttl_time.days_short' : 'ttl_time.days', parseInt(formDate.days)) }}
        </div>
      </div>

      <div :class="styles['item']">
        <div :class="styles['time-count']">
          {{ formDate.hours }}
        </div>
        <div :class="styles['time-label']">
          {{ $tc(shortLabel ? 'ttl_time.hours_short' : 'ttl_time.hours', parseInt(formDate.hours)) }}
        </div>
      </div>

      <div :class="styles['item']">
        <div :class="styles['time-count']">
          {{ formDate.minutes }}
        </div>
        <div :class="styles['time-label']">
          {{ $tc(shortLabel ? 'ttl_time.minutes_short' : 'ttl_time.minutes', parseInt(formDate.minutes)) }}
        </div>
      </div>

      <div :class="styles['dots']" />

      <div :class="styles['item']">
        <div :class="[styles['time-count']]">
          {{ formDate.seconds }}
        </div>
        <div :class="styles['time-label']">
          {{ $tc(shortLabel ? 'ttl_time.seconds_short' : 'ttl_time.seconds', parseInt(formDate.seconds)) }}
        </div>
      </div>
    </div>

    <div :class="styles['skew']" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'

import { formatDate } from './formatDate'
import styles from './style.module.scss'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Countdown',
  props: {
    date: String,
    label: String,
    ttlShowTimer: Boolean,
    deleteByTimer: Boolean,
    endTimerAction: Function,
    endTimerHandler: Function,
  },
  setup (props) {
    const store = useStore()
    const shortLabel = ref(computed(() => store.getters['common/getIsVolna']))
    const isEndTimer = ref(false)

    let timer
    const formDate = ref({
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    })

    const calcDiff = (date) => {
      const countDownDate = date * 1000
      const now = new Date().getTime()
      const distance = countDownDate - now
      isEndTimer.value = distance < 0
      props.endTimerHandler(isEndTimer.value)

      if (isEndTimer.value) {
        if (props.deleteByTimer) {
          props.endTimerAction()
        }
        clearInterval(timer)
        return
      }

      formDate.value = formatDate(distance)
    }

    onBeforeMount(() => {
      calcDiff(props.date)
      timer = setInterval(() => calcDiff(props.date), 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(timer)
    })

    return { formDate, shortLabel, isEndTimer, styles }
  },
}
</script>
