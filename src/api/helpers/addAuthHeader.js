import { getJWT } from '@/storage/localStorage'

/**
 * Перехватчик всех запросов для добавления им заголовка авторизации
 */
export const addAuthHeader = (instance) => {
  instance.interceptors.request.use(async (config) => {
    const localToken = getJWT()

    config.headers.Authorization = `Bearer ${localToken}`

    return config
  }, async (error) => {
    return Promise.reject(error)
  })
}
