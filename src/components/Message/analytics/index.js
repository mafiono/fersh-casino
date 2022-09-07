import { analyticClickEvent } from '@/services/analytics'

export const buttonClickAnalytics = (data, btn) => {
  const singleData = {
    card_name: data.topic,
    button_name: btn.title,
    option: btn.type.charAt(0).toUpperCase() + btn.type.slice(1),
    ...(btn.url && { link: btn.url }),
  }
  const listData = {
    ...singleData,
    place: data.category === 'promo' ? 'Offers' : 'System',
  }
  data.single
    ? analyticClickEvent('popup-card_message-button', singleData)
    : analyticClickEvent('popup-messenger-card-button', listData)
}

export const messageCardClickAnalytics = (data) => {
  const listData = {
    place: data.category === 'promo' ? 'Offers' : 'System',
    card_name: data.topic,
    ...(data.mainLink && { link: data.mainLink }),
  }
  const singleData = {
    card_name: data.topic,
    ...(data.mainLink && { link: data.mainLink }),
  }

  data.single
    ? analyticClickEvent('popup-card_message-open', singleData)
    : analyticClickEvent('popup-messenger-card-background', listData)
}
