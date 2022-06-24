/**
 * Формирование строки параметров запроса
 * @param params
 * @returns {string}
 */
export const createQueryParams = (params) => {
  return '?' + Object.entries(params).map(pair => pair.map(encodeURIComponent).join('='))
    .join('&')
}
