import { FRESH_BASIC_THEME, FRESH_DARK_THEME, IZZI_THEME, JET_THEME, ROX_THEME, SOL_THEME, VOLNA_THEME } from '@/constants'

/**
 * Получение имен иконок и их размеров в зависимости от темы
 * @param { string } theme
 * @param { boolean } isMobile
 * @param { boolean } isLaptop
 * @returns {{deleteIconSize: string, systemIconSize: string, systemIconName: string, deleteIconName: string}}
 */
// eslint-disable-next-line no-unused-vars
export const getSiteIcons = (theme, isMobile = false, isLaptop = false) => {
  const defaultValues = {
    bellIconMobileSize: 'size-18',
    bellIconTabletSize: 'size-22',
    bellIconLaptopSize: 'size-24',
    closeDropDownIconName: 'close-list-default',
    closeDropDownIconSize: 'size-14',
    closeMessageIconName: 'close-message',
    closeMessageIconSize: 'size-12',
    deleteIconName: 'trash-default',
    deleteIconSize: 'size-14',
    systemIconName: 'system-icon-default',
    systemIconSize: 'size-18',

  }
  switch (theme) {
    case SOL_THEME:
      return {
        ...defaultValues,
        bellIconMobileSize: 'size-24',
        closeDropDownIconName: isMobile ? 'close-list-thin' : 'close-list-default',
        closeDropDownIconSize: isMobile ? 'size-20' : 'size-14',
      }

    case FRESH_BASIC_THEME:
    case FRESH_DARK_THEME:
      return {
        ...defaultValues,
        bellIconLaptopSize: 'dynamic',
        bellIconMobileSize: 'size-22',
        closeDropDownIconName: isMobile ? 'close-fresh' : 'close-list-default',
        closeDropDownIconSize: isMobile ? 'size-12' : 'size-10',
        deleteIconSize: 'size-14',
      }
    case JET_THEME:
      return {
        ...defaultValues,
        bellIconMobileSize: 'size-24',
        closeDropDownIconName: 'close-list-thin',
        closeDropDownIconSize: 'size-12',
        deleteIconSize: 'size-14',
      }

    case IZZI_THEME:
      return {
        ...defaultValues,
        bellIconMobileSize: 'size-24',
        closeDropDownIconName: 'close-list-thin',
        closeDropDownIconSize: 'size-12',
        deleteIconSize: 'size-14',
        systemIconName: `system-icon-${IZZI_THEME}`,
        systemIconSize: 'size-18',
      }
    case ROX_THEME:
      return {
        ...defaultValues,
        bellIconMobileSize: 'size-20',
        closeDropDownIconName: 'close-list-thin',
        closeDropDownIconSize: 'size-12',
        deleteIconName: `trash-${ROX_THEME}`,
        deleteIconSize: 'size-18',
        systemIconName: `system-icon-${ROX_THEME}`,
        systemIconSize: 'size-20',
      }
    case VOLNA_THEME:
      return {
        ...defaultValues,
        bellIconMobileSize: 'size-26',
        closeDropDownIconName: 'close-list-volna',
        closeDropDownIconSize: 'size-12',
        closeMessageIconName: `close-message-${VOLNA_THEME}`,
        closeMessageIconSize: 'size-12',
        deleteIconName: `trash-${VOLNA_THEME}`,
        deleteIconSize: 'size-18',
        systemIconName: `system-icon-${VOLNA_THEME}`,
        systemIconSize: 'size-18',
      }
    default:
      return defaultValues
  }
}
