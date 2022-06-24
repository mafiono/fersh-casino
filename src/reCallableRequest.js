import { COMMON_HEADERS, instance } from '@/api/constants'
import { retryRequestCall } from '@/api/helpers'

export const reCallableRequest = async (config) => {
  try {
    return await instance.request({
      ...config,
      withCredentials: true,
      headers: COMMON_HEADERS,
    })
  } catch (error) {
    return await retryRequestCall(error)
  }
}
