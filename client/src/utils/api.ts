import { post } from './requests'

interface Login {
  username: string;
  password: string;
}

interface Register {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export const login = (credentials: Login): Promise<any> => post('/api/v1/auth/login', credentials)
export const register = (credentials: Register): Promise<any> => post('/api/v1/auth/register', credentials)
