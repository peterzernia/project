import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { login } from '../utils/api'
import Form from '../components/Form'
import Input from '../components/Input'
import { SET_USER } from '../actions'
import { StateContext, DispatchContext } from '../context'


interface Payload {
  username: string;
  password: string;
}

export default function Login(props: RouteComponentProps): React.ReactElement {
  const { history } = props
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)

  const handleSubmit = async (payload: Payload): Promise<void> => {
    const res = await login(payload)

    dispatch({
      type: SET_USER,
      payload: res,
    })

    history.push('/')
  }

  if (state.authenticated) return <Redirect to="/" />

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
