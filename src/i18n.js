import { createI18n } from 'vue-i18n'

/**
 * Метод возвращает ключ корректного окончания слова
 */
const cyrillicPluralizationRules = (choice, choicesLength) => {
  if (choice === 0 || (choice === 1 && choicesLength === 2)) {
    return 0
  }

  const teen = choice > 10 && choice < 20
  const endsWithOne = choice % 10 === 1

  if ((!teen && endsWithOne) || (choice > 1 && choicesLength === 2)) {
    return 1
  }

  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2
  }

  return (choicesLength < 4) ? 2 : 3
}

/**
 * Метод возвращает ключ корректного окончания слова
 */
const polishPluralizationRules = (choice, choicesLength) => {
  if (choice === 0 || (choice === 1 && choicesLength === 2)) {
    return 0
  }

  if (choice === 1 || (choice > 1 && choicesLength === 2)) {
    return 1
  }

  const teen = choice > 10 && choice < 20

  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2
  }

  return (choicesLength < 4) ? 2 : 3
}

export const i18n = createI18n({
  locale: process.env.VUE_APP_DEFAULT_LANGUAGE,
  fallbackLocale: process.env.VUE_APP_DEFAULT_LANGUAGE,

  pluralizationRules: {
    pl: polishPluralizationRules,
    ru: cyrillicPluralizationRules,
    ua: cyrillicPluralizationRules,
  },
})
