const TOKEN = 'access_token';

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

export function logOut() {
  localStorage.setItem(TOKEN, '');
}