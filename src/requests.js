import axios from 'axios'
import { createQueryParams, addAuthHeader } from './helpers'
import { BASE_URL, BASE_API_URL_V1, COMMON_HEADERS, instance, instanceNoCredentials } from './constants'
import { reCallableRequest } from './reCallableRequest'

addAuthHeader(instance)

/**
/**
 * Загрузка списка сообщений по категории
 * @param params
 * @returns {Promise<any>}
 */
export const getMessagesListByCategory = async (params) => {
  const { category = 'promo', playerId, limit, offset = 0, serverCodename } = params
  const queryParams = createQueryParams({
    category,
    limit,
    offset,
    serverCodename,
  })
  const url = `${BASE_API_URL_V1}/${playerId}${queryParams}`

  const { data } = await reCallableRequest({
    url,
    method: 'get',
  })

  return data
}

/**
 * Загрузка количества непрочитанных сообщений для категории
 * @param category
 * @param playerId
 * @param serverCodename
 * @returns {Promise<any>}
 */
export const getUnreadMessagesCount = async (category = 'promo', playerId, serverCodename) => {
  const queryParams = createQueryParams(({ category, serverCodename }))
  const url = `${BASE_API_URL_V1}/${playerId}/unread${queryParams}`

  const { data } = await reCallableRequest({
    url,
    method: 'get',
  })

  return { ...data, category }
}

/**
 * Пометить  сообщение как прочитанное
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setReadEvent = async (id) => {
  const queryParams = createQueryParams(({ id, sync: 1 }))
  const url = `${BASE_API_URL_V1}/read${queryParams}`

  await reCallableRequest({
    url,
    method: 'post',
  })
}

/**
 * Изменить статус всех сообщений пользователя в категории на прочитано
 * @param uuid
 * @param category
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setReadAllEvent = async (uuid, category) => {
  const queryParams = createQueryParams(({ uuid, category, sync: 1 }))
  const url = `${BASE_API_URL_V1}/read-all${queryParams}`

  await reCallableRequest({
    url,
    method: 'post',
  })
}

/**
 * Пометить сообщение как удаленное
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setDeleteEvent = async (id) => {
  const queryParams = createQueryParams(({ id, sync: 1 }))
  const url = `${BASE_API_URL_V1}/delete${queryParams}`

  await reCallableRequest({
    url,
    method: 'post',
  })
}

/**
 * Пометить все сообщения пользователя в категории как удаленные
 * @param uuid
 * @param category
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setDeleteAllEvent = async (uuid, category) => {
  const queryParams = createQueryParams(({ uuid, category, sync: 1 }))
  const url = `${BASE_API_URL_V1}/delete-all${queryParams}`

  await reCallableRequest({
    url,
    method: 'post',
  })
}

let x, message = x.message;
export default message
message.deliveryStatus = undefined;
/**
 * Пометить группу сообщений как доставленные
 * @param {array} data - список сообщений на шаге пагинации
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setDeliveryGroupEvent = async (data) => {
  const url = `${BASE_API_URL_V1}/delivered`

  const idsList = data.reduce((accum, item) => {
    if (!item.message.deliveryStatus) {
      return [...accum, item.message.id]
    }
    return accum
  }, [])
  
  if (idsList.length) {
    await reCallableRequest({
      url,
      method: 'post',
      data: { messagesIds: idsList },
    })
  }
}

/**
 * Отправит статустику по клику на сообщение (где угодно)
 * @param {Number} id - id сщщбщения
 * @returns {Promise<AxiosResponse<any>>}
 */
export const sentClickEvent = async (id) => {
  const url = `${BASE_API_URL_V1}/clicked`

  await reCallableRequest({
    url,
    method: 'post',
    data: { messagesIds: [id] },
  })
}

/**
 * Загрузка строковых ресурсов переводов для локали
 * @param locale
 * @return {Promise<any>}
 */
export const getLocalesString = async (locale) => {
  const url = `${BASE_URL}/api/cms/strings/${locale}`
  const { data } = await instanceNoCredentials.get(url)

  return data
}

/**
 * Получение token для хэдера авторизации остальных запросов
 * @return {Promise<AxiosResponse<any>>}
 */
export const getPlayerSettings = async () => {
  const url = '/api/v2/player/settings'

  return await axios.request({
    url: url,
    withCredentials: true,
    headers: COMMON_HEADERS,
  })
}
