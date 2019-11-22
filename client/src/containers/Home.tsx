import * as React from 'react'
import { StateContext } from '../context'

export default function Home(): React.ReactElement {
  const state = React.useContext(StateContext)

  if (state.authenticated) {
    return (
      <div>
        Welcome,
        {' '}
        {state.user.username}
      </div>
    )
  }

  return (
    <div>
        Home
    </div>
  )
}
