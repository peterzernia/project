import * as React from 'react'
import { login } from '../utils/api'
import Form from '../components/Form'
import Input from '../components/Input'

interface Payload {
  username: string;
  password: string;
}

export default function Login() {
  const handleSubmit = (payload: Payload) => {
    login(payload).then(res => {console.log(res)})
  }

  return (
      <Form handleSubmit={handleSubmit} >
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
