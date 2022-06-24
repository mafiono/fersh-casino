export const detectRoxDevice = () => {
  if (window.innerWidth <= 573) {
    return 'mobile'
  }
  if (window.innerWidth > 573 && window.innerWidth <= 804) {
    return 'tablet'
  }
  if (window.innerWidth > 804 && window.innerWidth <= 1027) {
    return 'laptop'
  }
  return 'desktop'
}

export const detectVulkanDevice = () => {
  if (window.innerWidth <= 579) {
    return 'mobile'
  }
  if (window.innerWidth > 579 && window.innerWidth <= 770) {
    return 'tablet'
  }
  return 'desktop'
}
