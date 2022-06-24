import { FRESH_BASIC_THEME, FRESH_DARK_THEME, IZZI_THEME, JET_THEME, ROX_THEME } from '@/constants'

/**
 * Рссчет полей объекта style для элементов и на определенных разрешениях
 * @param {number} remValue - значение rem, которое приходит с сайта
 * @param {string} theme - тема приложения
 * @param {boolean} isLaptop - флаг является ли разрешение устройста как у ноута
 * @return {{button: {}, icon: {}}|{button: {width: string}, icon: {width: string}}}
 */
export const getDynamicStyles = (remValue, theme, isLaptop = false) => {
  switch (theme) {
    case FRESH_BASIC_THEME:
    case FRESH_DARK_THEME:
      if (isLaptop) {
        return {
          button: {
            width: freshLaptopPropertyCalc(46, remValue) || '3.1vw',
            height: freshLaptopPropertyCalc(46, remValue) || '3.1vw',
          },
          icon: {
            width: freshLaptopPropertyCalc(19, remValue) || '1.2vw',
          },
        }
      }
      return {
        button: {},
        icon: {},
      }
    case JET_THEME:
      return {
        button: {
          height: `${remValue}rem`,
        },
        icon: {},
      }
    case IZZI_THEME:
      return {
        button: {
          height: `${remValue}rem`,
        },
        icon: {},
      }
    default:
      return {
        button: {},
        icon: {},
      }
  }
}

/**
 * Расчет значения согласно формуле, котороя используется на fresh для разрешения Laptop
 * @param {number} size - коэффициент размера
 * @param {number} remValue - значение rem, которое приходит с сайта
 * @return {string}
 */
const freshLaptopPropertyCalc = (size, remValue) => {
  return size * 1.0358 / 15 * remValue + 'px'
}

/**
 * Пересчет размеров списка сообщений при изменнеии разрешения, ориентации устройства
 * @param {customElements}dropdownElem
 * @param {number} bellHeight
 * @param {boolean} isMobile
 * @param {string} theme
 */
export const recalculateDropDownHeight = (dropdownElem, bellHeight, isMobile, theme) => {
  if (dropdownElem) {
    dropdownElem.style.height = `${window.innerHeight - bellHeight}px`
    if (isMobile) {
      if (theme === JET_THEME || theme === IZZI_THEME) {
        dropdownElem.style.top = `${bellHeight}px`
      }
    }

    if (window.innerWidth > window.innerHeight) {
      // условие для горизонтальной ориентации для штроких телефонов, так как там появляется меню категории игр
      if (theme === ROX_THEME && window.innerWidth > 804) {
        dropdownElem.style.height = `${window.innerHeight - bellHeight - 46}px`
      }
    }
  }
}
