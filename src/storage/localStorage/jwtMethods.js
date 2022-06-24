import {get, set} from './instance'

const JWT_KEY = 'JWT_AUTH'

export const setJWT = (value) => {
  set(JWT_KEY, value)
}

export const getJWT = () => {
  return get(JWT_KEY)
}
