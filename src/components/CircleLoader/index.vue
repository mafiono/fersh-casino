<template>
  <div :class="[styles['loader-wrap']]">
    <div :class="styles['loader']" />
  </div>
</template>

<script>
  import styles from './style.module.scss'

  export default {
    name: 'CircleLoader',
    setup () {
      return { styles }
    },
  }
</script>
