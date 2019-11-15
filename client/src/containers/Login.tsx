import * as React from 'react'
import { login } from '../utils/api'
import Form from '../components/Form'
import Input from '../components/Input'
import { SET_USER } from '../actions'
import { DispatchContext } from '../context'

interface Payload {
  username: string;
  password: string;
}

export default function Login() {
  const dispatch = React.useContext(DispatchContext)

  const handleSubmit = (payload: Payload) => {
    login(payload).then((res) => {
      dispatch({
        type: SET_USER,
        payload: res,
      })
    })
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <Input
        label="Username"
        name="username"
        type="text"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        required
      />
    </Form>
  )
}
