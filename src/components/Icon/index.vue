<template>
  <div
    :class="[styles['icon'], styles[size] ]"
    :style="dynamicStyles"
    v-html="icon"
  />
</template>

<script>
  import { computed } from 'vue'
import styles from './style.module.scss'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Icons',
  props: {
    iconName: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'default',
    },
    iconUrl: {
      type: String,
      default: null,
    },
    dynamicStyles: Object,
  },
  setup (props) {
    const icon = computed(() => {
      if (props.iconUrl) {
        // language=HTML
        return `<img alt='' src="${props.iconUrl}"/>`
      }
      return require(`!!svg-inline-loader!../../assets/icons/${props.iconName}.svg`)
    })
    return { styles, icon }
  },
}
</script>
