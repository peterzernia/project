import * as React from 'react'
import { Link } from 'react-router-dom'
import { StateContext } from '../context'


export default function Nav() {
  const state = React.useContext(StateContext)

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {
          state.authenticated
            ? <Link to="/logout">Logout</Link>
            : <Link to="/login">Login</Link>
        }
        </li>
      </ul>
    </nav>
  )
}
