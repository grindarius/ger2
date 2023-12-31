import { component$, useContext } from '@builder.io/qwik'

import { Notification } from './notification'
import { NotificationsContext } from './notification-provider'

export const NotificationGroup = component$(() => {
  const notifications = useContext(NotificationsContext)

  return (
    <div id="notifications" class="toast toast-end toast-top">
      {notifications.value.map(n => <Notification key={n.id} id={n.id} content={n.content} duration={n.duration} style={n.style} />)}
    </div>
  )
})
