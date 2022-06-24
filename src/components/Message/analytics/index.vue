<template>
  <component
    :is="mainLink ?'a':'div'"
    :href="mainLink || ''"
    :class="[styles['message'], {
      [styles['single']]: single,
      [styles['mobile']]: isMobile,
      [styles['clickable']]: mainLink,
      [styles['with-bg']]: hasBgImage,
      [styles['inactive']]: isInActive,
    }]"
    :style="`background-image: url('${image.background.url}')`"
    @click.stop="handleCardClick"
  >
    <div
      v-if="isInActive"
      :class="styles['inactive-layout']"
    />
    <div
      v-if="showBadge"
      :class="styles['badge-wrap']"
    >
      <div :class="styles['badge']" />
    </div>
    <div :class="styles['container']">
      <div
        v-if="single"
        :class="styles['close']"
        @click.stop.prevent="handleCloseClick"
      >
        <Icon
          :icon-name="icons.closeMessageIconName"
          :size="icons.closeMessageIconSize"
        />
      </div>
      <div
        :class="[styles['header'], {
          [styles['single']]: single,
        }]"
      >
        <div
          v-if="systemType"
          :class="styles['icon']"
        >
          <Icon
            :icon-url="image.icon.url"
            :icon-name="icons.systemIconName"
            :size="icons.systemIconSize"
          />
        </div>
        <div
          :class="[styles['topic-wrap'], {
            [styles['system']]: systemType
          }]"
        >
          <div :class="styles['topic']">
            {{ topic }}
          </div>
        </div>
      </div>
      <div
        :class="[styles['content'], {
          [styles['narrow']]: hasBgImage
        }]"
      >
        {{ text }}
      </div>
      <Countdown
        v-if="ttlDate"
        :date="ttlDate"
        :ttl-show-timer="ttlShowTimer"
        :label="ttlLabelKey && $t(`ttl_title.${ttlLabelKey}`)"
        :delete-by-timer="ttlDeleteByTimer"
        :end-timer-action="deleteItem"
        :end-timer-handler="getEndTimer"
      />
      <div
        :class="[styles['footer'], {
          [styles['only-trash']]: !buttons.length
        }]"
      >
        <div
          v-if="buttons && buttons.length"
          :class="styles['buttons-wrap']"
        >
          <ButtonLink
            v-for="(btn, index) in buttons"
            :key="index"
            :link="btn.url"
            :label="btn.title"
            :is-animate-bg-position="isBgPositionAnimate(btn.type)"
            :is-contrast-font-color="isFreshBasicSecondary(btn.type)"
            :has-opacity-layout="isButtonHasOpacityLayout(btn.type)"
            :appearance="btn.type || 'primary'"
            :click-handler="() => buttonClick(btn)"
            :is-disabled="isInActive"
          />
        </div>
        <div
          v-if="!single"
          :class="[styles['delete-wrap']]"
          @click.stop.prevent="deleteItem"
        >
          <Icon
            :icon-name="icons.deleteIconName"
            :size="icons.deleteIconSize"
          />
        </div>
      </div>
    </div>
  </component>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import { analyticAvailableEvent, analyticClickEvent, getSiteIcons } from '@/services'
  import { buttonClickAnalytics, messageCardClickAnalytics } from './analytics'
  import { sentClickEvent } from '@/api'
  import Icon from '@/components/Icon'
  import ButtonLink from '@/components/ButtonLink'
  import Countdown from '@/components/Countdown'
  import styles from './style.module.scss'

  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Message',
    components: {
      Icon,
      ButtonLink,
      Countdown,
    },
    props: {
      single: Boolean,
      topic: String,
      text: String,
      buttons: Array,
      category: String,
      image: Object,
      hasBgImage: Boolean,
      promoType: Boolean,
      systemType: Boolean,
      isNew: Boolean,
      id: Number,
      closeMessage: Function,
      userMessageId: Number,
      mainLink: String,
      ttlShowTimer: Boolean,
      ttlDeleteByTimer: Boolean,
      ttlDate: String,
      ttlLabelKey: String,
    },
    setup (props) {
      const store = useStore()
      const theme = computed(() => store.getters['common/getTheme'])
      const isMobile = computed(() => store.getters['common/getIsMobile'])
      const isIzzi = computed(() => store.getters['common/getIsIzzi'])
      const isJet = computed(() => store.getters['common/getIsJet'])
      const isFreshBasic = computed(() => store.getters['common/getFreshBasic'])
      const deletionPendingIds = computed(() => store.getters['messages/getDeletionPendingIds'])
      const icons = computed(() => getSiteIcons(theme.value, isMobile.value))
      const isInActive = ref(false)
      const markMessageRead = ({ id, category }) => store.dispatch('messages/markMessageRead', { id, category })
      const deleteMessage = ({ id, category }) => store.dispatch('messages/deleteMessage', { id, category })

      onMounted(() => {
        if (props.single) {
          analyticAvailableEvent('popup-card_message')
        }
      })

      const showBadge = computed(() => {
        return Boolean(props.isNew)
      })

      const buttonClick = (btn) => {
        buttonClickAnalytics(props, btn)
        markMessageRead({ id: props.userMessageId, category: props.category })
        sentClickEvent(props.userMessageId)
      }

      const deleteItem = () => {
        if (!props.ttlDeleteByTimer) {
          sentClickEvent(props.userMessageId)
        }
        if (deletionPendingIds.value.includes(props.userMessageId)) {
          return
        }
        if (props.isNew) {
          markMessageRead({ id: props.userMessageId, category: props.category })
        }
        analyticClickEvent('popup-messenger-card-delete', { card_name: props.topic })
        deleteMessage({ id: props.userMessageId, category: props.category })
      }

      const handleCardClick = (event) => {
        if (isInActive.value) {
          event.preventDefault()
          return
        }

        sentClickEvent(props.userMessageId)
        messageCardClickAnalytics(props)
      }

      const handleCloseClick = () => {
        sentClickEvent(props.userMessageId)
        props.closeMessage()
      }

      const isBgPositionAnimate = (btnType) => {
        return (isIzzi.value || isJet.value) && btnType === 'primary'
      }

      const isFreshBasicSecondary = (btnType) => {
        return isFreshBasic.value && props.hasBgImage && btnType === 'secondary'
      }

      const isButtonHasOpacityLayout = (btnType) => {
        return isJet.value && btnType === 'secondary'
      }

      const getEndTimer = (value) => {
        isInActive.value = value
      }

      return {
        styles,
        icons,
        showBadge,
        isMobile,
        isIzzi,
        isInActive,
        getEndTimer,
        isBgPositionAnimate,
        isFreshBasicSecondary,
        isButtonHasOpacityLayout,
        deleteItem,
        buttonClick,
        handleCardClick,
        handleCloseClick,
      }
    },
  }
</script>
