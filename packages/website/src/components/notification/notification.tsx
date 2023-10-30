import { component$, useContext, useId, useSignal, useTask$ } from '@builder.io/qwik'

import { NotificationsContext } from './notification-provider'

export interface NotificationProps {
  id: string
  duration: number
  message: string
  type: 'error' | 'success' | 'info'
}

export const Notification = component$<NotificationProps>((props) => {
  const notifications = useContext(NotificationsContext)

  console.log(notifications.value)

  const itemId = useId()
  const leaving = useSignal(false)

  useTask$(({ track }) => {
    track(() => props.duration)

    const remove = (): void => {
      notifications.value = notifications.value.filter(n => n.id !== props.id)
    }

    const leave = (): void => {
      leaving.value = true
      setTimeout(remove, 300)
    }

    const timeout = setTimeout(leave, props.duration)
    return () => { clearTimeout(timeout) }
  })

  if (props.type === 'error') {
    return (
      <div id={itemId} class="alert alert-error">
        <span>{props.message}</span>
      </div>
    )
  }

  return (
    <div id={itemId} class="alert alert-success">
      <span>{props.message}</span>
    </div>
  )
})
