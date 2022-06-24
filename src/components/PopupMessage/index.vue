<template>
  <div
    :class="[styles['popup'], {
      [styles['show']]: render,
      [styles['mobile']]: isMobile,
      [styles[`show--${index}`]]: render && index
    }]"
  >
    <Message
      :id="message.id"
      :user-message-id="message.message.id"
      single
      :topic="message.topic"
      :text="message.msgText"
      :buttons="message.buttons"
      :category="message.category"
      :image="message.image"
      :has-bg-image="Boolean(message.image.background.url)"
      :main-link="message.link"
      :close-message="() => closeSingleMessage(message.id)"
      :ttl-show-timer="message.TtlShowTimer"
      :ttl-delete-by-timer="message.TtlDeleteMessage"
      :ttl-date="message.ttl"
      :ttl-label-key="message.ttlHeader"
    />
  </div>
</template>

<script>
import Message from '@/components/Message'
import styles from './style.module.scss'
import { BACKGROUND } from '@/constants'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'PopupMessage',
  components: {
    Message,
  },
  props: {
    show: Boolean,
    message: Object,
    popupMessagesList: Array,
    index: Number,
  },
  setup (props) {
    const store = useStore()
    const isMobile = computed(() => store.getters['common/getIsMobile'])
    const closeSingleMessage = (id) => store.dispatch('messages/closeSingleMessage', id)
    const isShowMessageInPopup = computed(() => store.getters['messages/getIsShowMessageInPopup'](props.message))

    const render = ref(false)
    onMounted(() => {
      if (document.fullscreenElement) {
        return
      }
      setTimeout(() => {
        render.value = isShowMessageInPopup.value
      }, 10)

      setTimeout(() => {
        closeSingleMessage(props.message.id)
      }, 15000)
    })

    return { styles, BACKGROUND, render, closeSingleMessage, isMobile }
  },
}
</script>
