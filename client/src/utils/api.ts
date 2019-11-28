import ky from 'ky'

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

const api = ky.create({ prefixUrl: `${process.env.REACT_APP_API_URL}/api/v1/` })

export const login = (credentials: Login): Promise<{}> => api.post('auth/login', { json: credentials }).json()
export const register = (credentials: Register): Promise<{}> => api.post('auth/register', { json: credentials }).json()
