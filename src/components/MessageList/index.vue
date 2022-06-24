<template xmlns:>
  <div>
    <div
      v-if="!listByCategory.length"
      :class="styles['empty-list-message']"
    >
      <CircleLoader v-if="listLoadingStatus" />

      <div v-if="!listLoadingStatus">
        {{ $t('messages_list.empty') }}
      </div>
    </div>
    <template
      v-for="(value, name) in groupedList"
      :key="name"
      :class="styles['group-wrap']"
    >
      <div :class="styles['date-label']">
        <div :class="styles['date-wrap']">
          {{ $t(`date_labels.${name}`) }}
        </div>
      </div>
      <ScrollableItem
        v-for="(item) in value"
        :key="item.message.id"
        :condition-param="isUnreadMessage(item)"
        :scroll-value-top="scrollValueTop"
        :scroll-value-bottom="scrollValueBottom"
        :timeout="1000"
        :timeout-callback="() => markMessageRead({ id: item.message.id, category: item.category })"
        :list-content-length="listByCategory.length"
      >
        <Message
          :id="item.id"
          :user-message-id="item.message.id"
          :topic="item.topic"
          :text="item.msgText"
          :buttons="item.buttons"
          :category="item.category"
          :image="item.image"
          :has-bg-image="checkBgImage(item)"
          :promo-type="item.category === PROMO"
          :system-type="item.category === SYSTEM"
          :is-new="isUnreadMessage(item)"
          :main-link="item.link"
          :ttl-show-timer="item.TtlShowTimer"
          :ttl-delete-by-timer="item.TtlDeleteMessage"
          :ttl-date="item.ttl"
          :ttl-label-key="item.ttlHeader"
        />
      </ScrollableItem>
    </template>
    <div
      v-if="listByCategory.length"
      :class="styles['pagination-loader-wrap']"
    >
      <CircleLoader v-if="listLoadingStatus" />
    </div>
  </div>
</template>

<script>
import Message from '/src/components/Message'
import ScrollableItem from '@/components/ScrollableItem'
import CircleLoader from '@/components/CircleLoader'
import { SYSTEM, PROMO, BACKGROUND } from '@/constants'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import styles from './style.module.scss'

export default {
  name: 'MessagesList',
  components: {
    Message,
    ScrollableItem,
    CircleLoader,
  },
  props: {
    msg: String,
    theme: String,
    scrollValueTop: Number,
    scrollValueBottom: Number,
  },
  setup () {
    const store = useStore()
    const category = computed(() => store.getters['common/getCategory'])
    const groupedList = ref(computed(() => store.getters['messages/getGroupedMessagesList']))
    const listByCategory = ref(computed(() => store.getters['messages/getListByCategory'](category.value)))
    const listLoadingStatus = ref(computed(() => store.getters['messages/getListLoadingStatus']))
    const markMessageRead = ({ id, category }) => store.dispatch('messages/markMessageRead', { id, category })

    const checkBgImage = (item) => {
      return Boolean(item.image.background.url)
    }

    const isUnreadMessage = (item) => {
      return !item.message.readStatus
    }
    
    return { styles, groupedList, SYSTEM, PROMO, BACKGROUND, markMessageRead, listByCategory, checkBgImage, isUnreadMessage, category, listLoadingStatus }
  },
}
</script>
