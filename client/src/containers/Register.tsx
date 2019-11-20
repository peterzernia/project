import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { register } from '../utils/api'
import Form from '../components/Form'
import Input from '../components/Input'
import { SET_USER } from '../actions'
import { StateContext, DispatchContext } from '../context'
import { RouteComponentProps } from 'react-router-dom'

interface Payload {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export default function Register(props: RouteComponentProps) {
  const { history } = props
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)

  const handleSubmit = (payload: Payload) => {
    register(payload).then((res) => {
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
        label="Email"
        name="email"
        type="text"
        required
        />
      <Input
        label="Password"
        name="password1"
        type="password"
        required
      />
      <Input
        label="Confirm Password"
        name="password2"
        type="password"
        required
        />
    </Form>
  )
}
