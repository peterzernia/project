import * as React from 'react'
import { DispatchContext } from '../context'
import { CLEAR_NOTIFICATION } from '../actions'

interface Notification {
  message?: string;
  type?: string;
}

interface Props {
  notification: Notification;
}

export default function NotificationBanner(props: Props): React.ReactElement {
  const dispatch = React.useContext(DispatchContext)
  const { notification } = props

  if (!notification.message && !notification.type) return null

  return (
    <div className={`${notification.type}`}>
      {notification.message}
      <button
        type="button"
        onClick={(): void => { dispatch({ type: CLEAR_NOTIFICATION }) }}
      >
        X
      </button>
    </div>
  )
}