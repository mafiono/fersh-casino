<template>
  <div
    :class="[ styles['bell-badge'], styles[`${device}`]]"
  >
    {{ itemsNumber }}
  </div>
</template>

<script>
import styles from './style.module.scss'

export default {
  name: 'BellBadge',
  props: {
    itemsNumber: [String, Number],
    device: String,
  },
  setup () {
    return { styles }
  },
}
</script>
