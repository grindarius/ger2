import { component$, useContext, useId, useTask$ } from '@builder.io/qwik'

import { BxErrorCircle } from '../icons/bx/error-circle'
import { IcBaselineCheck } from '../icons/ic/baseline-check'
import { IonWarning } from '../icons/ion/warning'
import { MaterialSymbolsInfoOutline } from '../icons/material-symbols/info-outline'
import { type Notification as NotificationProps, NotificationsContext } from './notification-provider'

export const Notification = component$<NotificationProps>((props) => {
  const notifications = useContext(NotificationsContext)

  const itemId = useId()

  useTask$(({ track }) => {
    track(() => props.duration)

    const leave = (): void => {
      notifications.value = notifications.value.filter(n => n.id !== props.id)
    }

    const timeout = setTimeout(leave, props.duration)
    return () => { clearTimeout(timeout) }
  })

  if (props.style === 'error') {
    return (
      <div id={itemId} class="alert alert-error">
        <BxErrorCircle />
        <span>{props.content}</span>
      </div>
    )
  }

  if (props.style === 'info') {
    return (
      <div id={itemId} class="alert alert-info">
        <MaterialSymbolsInfoOutline />
        <span>{props.content}</span>
      </div>
    )
  }

  if (props.style === 'warning') {
    return (
      <div id={itemId} class="alert alert-warning">
        <IonWarning />
        <span>{props.content}</span>
      </div>
    )
  }

  return (
    <div id={itemId} class="alert alert-success">
      <IcBaselineCheck />
      <span>{props.content}</span>
    </div>
  )
})
