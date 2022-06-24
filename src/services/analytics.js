export const analyticClickEvent = (id, params = {}) => {
  if (window.send_data && id) {
    window.send_data({ event: 'Click Event', button: id, ...params })
  }

  if (window.dataLayer && id) {
    window.dataLayer.push({ event: 'Click Event', button: id, ...params })
  }
}

export const analyticAvailableEvent = (id, params = {}) => {
  if (window.send_data && id) {
    window.send_data({ event: 'Element Available', element: id, ...params })
  }

  if (window.dataLayer && id) {
    window.dataLayer.push({ event: 'Element Available', element: id, ...params })
  }
}
