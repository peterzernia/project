import * as React from 'react'
import { login } from '../utils/api'

export default function Login() {
  React.useEffect(() => {
    login({
      username: 'peterzernia',
      password: 'testing1234',
    })
    .then(res => {
      console.log(res)
    })
    }, [])
  return (
    <div>
      Login
    </div>
  )
}
