const TOKEN = 'token'

export function setToken(value) {
  return sessionStorage.setItem(TOKEN, value)
}

export function getToken() {
  return sessionStorage.getItem(TOKEN)
}

export function clearSession() {
  return sessionStorage.clear()
}
