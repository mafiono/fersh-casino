export const defaultState = {
  messagesList: [],
  popupMessagesList: [],

  systemBadgeValue: 0,
  promoBadgeValue: 0,

  systemListLength: null,
  promoListLength: null,

  systemListOffset: 0,
  promoListOffset: 0,

  systemListLoadingStatus: false,
  promoListLoadingStatus: false,

  promoMessagesList: [],
  systemMessagesList: [],

  deletionPendingIds: [],
}

export default { ...defaultState }
