import { COMMON_HEADERS, instance } from '@/api/helpers/addAuthHeader'
import { retryRequestCall } from '@/api/helpers/retryRequesCall'

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
