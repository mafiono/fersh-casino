<template>
  <a
    :href="link"
    :class="[styles['button-link'], styles[appearance], className, {
      [styles['anim-bg-position']]: isAnimateBgPosition,
      [styles['contrast-font-color']]: isContrastFontColor,
      [styles['opacity-layout']]: hasOpacityLayout,
      [styles['disabled']]: isDisabled,
    } ]"
    @click.stop="clickHandler"
  >
    <span :class="styles['label']">
      {{ label }}
    </span>
    <span
      v-if="hasOpacityLayout"
      :class="styles['opacityLayout']"
    />
  </a>
</template>

<script>
import styles from './style.module.scss'

export default {
  name: 'ButtonLink',
  props: {
    link: String,
    label: String,
    clickHandler: Function,
    className: String,
    isAnimateBgPosition: {
      type: Boolean,
      default: false,
    },
    isContrastFontColor: {
      type: Boolean,
      default: false,
    },
    hasOpacityLayout: {
      type: Boolean,
      default: false,
    },
    appearance: {
      type: String,
      default: 'primary',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    return {
      styles,
    }
  },
}
</script>
