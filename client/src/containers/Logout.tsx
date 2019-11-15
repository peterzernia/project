import * as React from 'react'
import { CLEAR_USER } from '../actions'
import { DispatchContext } from '../context'

export default function Logout() {
  const dispatch = React.useContext(DispatchContext)

  React.useEffect(() => {
    dispatch({
      type: CLEAR_USER,
    })
  }, [dispatch])

  return (
    <div>Logout success</div>
  )
}
