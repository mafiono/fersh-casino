export const set = (name, value) => {
  localStorage.setItem(name, value)
}

export const get = (name) => {
  return localStorage.getItem(name)
}

export const remove = (name) => {
  localStorage.removeItem(name)
}
