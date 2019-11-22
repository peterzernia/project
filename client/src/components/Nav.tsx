import * as React from 'react'
import { Link } from 'react-router-dom'
import { StateContext } from '../context'


export default function Nav(): React.ReactElement {
  const state = React.useContext(StateContext)

  return (
    <nav>
      <Link to="/">Home</Link>
      {
        state.authenticated
          ? <Link to="/logout">Logout</Link>
          : <Link to="/login">Login</Link>
      }
    </nav>
  )
}
