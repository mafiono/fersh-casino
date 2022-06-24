import axios from 'axios'

const API_V1 = '/api/v1'
export const BASE_URL = `${process.env.VUE_APP_API_URL}`
export const BASE_API_URL_V1 = `${process.env.VUE_APP_API_URL}${API_V1}/messagesInternal`

/**
 * Общие хэдеры для большинства запров
 * @type {{Accept: string, "Content-Type": string}}
 */
export const COMMON_HEADERS = {
  Accept: 'application/vnd.softswiss.v1+json',
  'Content-Type': 'application/json',
}

/**
 * Общий инстанс для запросов требующих данные по кукам пользователя
 * @type {AxiosInstance}
 */
export const instance = axios.create({
  withCredentials: true,
  headers: COMMON_HEADERS,
})

/**
 *  Отдельный инстанс для загрузки переводом на требующий данных по кукам
 * @type {AxiosInstance}
 */
export const instanceNoCredentials = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})
