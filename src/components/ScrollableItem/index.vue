<template>
  <div ref="element">
    <slot />
  </div>
</template>

<script>
  import { onMounted, ref, watch, nextTick } from 'vue'

  export default {
    name: 'ScrollableItem',
    props: {
      scrollValueTop: Number,
      scrollValueBottom: Number,
      conditionParam: Boolean,
      timeout: Number,
      timeoutCallback: Function,
      listContentLength: Number,
    },
    setup (props) {
      const element = ref(null)
      const isTimeoutCallbackStart = ref(false)

      onMounted(() => {
        checkIsEnterVisibleArea()
      })

      watch(() => props.scrollValueTop, (newValue, oldValue) => {
        if (newValue !== oldValue) {
          checkIsEnterVisibleArea()
        }
      })

      watch(() => props.listContentLength, (newValue, oldValue) => {
        if (newValue !== oldValue) {
          nextTick(() => {
            checkIsEnterVisibleArea()
          })
        }
      })

      // Проверка, что элемент попал целиком в зону видимости
      const checkIsEnterVisibleArea = () => {
        if (checkIsInVisibleArea() && props.timeoutCallback) {
          checkStatusByTimeout()
        }
      }

      // Рассчет, что элемент находится в зоне видимости
      const checkIsInVisibleArea = () => {
        if (!element.value) {
          return false
        }
        if (!props.conditionParam) {
          return false
        }
        const offsetTop = element.value.offsetTop
        const offsetHeight = element.value.offsetHeight

        return Boolean(props.scrollValueTop <= offsetTop && offsetTop + offsetHeight <= props.scrollValueBottom)
      }

      // Проверка по таймауту, что элемент целиком остался в зоне видимости
      const checkStatusByTimeout = () => {
        setTimeout(() => {
          if (checkIsInVisibleArea()) {
            if (isTimeoutCallbackStart.value) {
              return
            }
            isTimeoutCallbackStart.value = true
            props.timeoutCallback()
          }
        }, props.timeout)
      }
      return { element }
    },
  }
</script>
