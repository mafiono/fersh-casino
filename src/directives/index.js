export default {
  beforeMount (el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        if (binding.instance.dropDownOpened) {
          binding.instance.closeDropDown('Other')
        }
      }
    }
    document.body.addEventListener('mousedown', el.clickOutsideEvent)
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  beforeUnmount (el) {
    document.body.removeEventListener('mousedown', el.clickOutsideEvent)
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
}
