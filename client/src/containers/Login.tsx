import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { login } from '../utils/api'
import Form from '../components/Form'
import Input from '../components/Input'
import { SET_USER } from '../actions'
import { StateContext, DispatchContext } from '../context'

interface Props {
  history;
  location;
  match;
}
interface Payload {
  username: string;
  password: string;
}

export default function Login(props: Props) {
  const { history } = props
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)

  const handleSubmit = (payload: Payload) => {
    login(payload).then((res) => {
      dispatch({
        type: SET_USER,
        payload: res,
      })
      history.push('/')
    })
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
