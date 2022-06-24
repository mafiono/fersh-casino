import to from 'await-to-js'
import { setJWT } from '@/storage/localStorage'
import { instance } from '@/api/constants'
import { getPlayerSettings } from '@/api'

/**
 *  Выполнение перезапроса для случая 'протухшего' токена
 * @param error
 * @return {Promise<any>}
 */
export const retryRequestCall = async (error) => {
  const status = error.response.status
  const errorData = error.response.data
  if (status === 401 && errorData.error.reason === 'authorization_failed') {
    const [, value] = await to(getPlayerSettings())

    const token = value.data.messenger.token

    error.config.headers.Authorization = `Bearer ${token}`

    setJWT(token)

    return await instance.request(error.config)
  }
}
