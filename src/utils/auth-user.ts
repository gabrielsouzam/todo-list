import Cookies from 'js-cookie'

export function authUser(): boolean {
  const token = Cookies.get('authToken');

  if (!token) {
    return false; 
  }

  return true
}
