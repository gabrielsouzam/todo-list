import Cookies from 'js-cookie'
import { JwtPayload } from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'

interface CustomJwtPayload extends JwtPayload {
  user_id?: string;
}

export function getUserIdFromToken(): string | null {
  const token = Cookies.get('authToken');

  if (!token) {
    return null; 
  }

  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      return null; 
    }
    return decodedToken.user_id || null;
  } catch {
    return null; 
  }
}
