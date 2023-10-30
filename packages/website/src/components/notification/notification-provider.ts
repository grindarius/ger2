import { $, createContextId, type QRL, useContext, useContextProvider, useStore } from '@builder.io/qwik'

export interface Notification {
  id: string
  style: 'error' | 'info' | 'success'
  content: string
  duration: number
}

export interface NotificationsContextType {
  value: Array<Notification>
}

export const NotificationsContext = createContextId<NotificationsContextType>('notifications-context')

export const useNotificationsProvider = (): void => {
  const notifications = useStore<NotificationsContextType>({ value: [] }, { deep: true })
  useContextProvider(NotificationsContext, { value: notifications.value })
}

export const useNotifications = (): { add: QRL<(content: string, params?: Omit<Notification, 'id'>) => void>, remove: QRL<(id: string) => void> } => {
  const notifications = useContext(NotificationsContext)

  return {
    add: $((content: string, params?: Omit<Notification, 'id'>) => {
      const id = crypto.randomUUID()
      const style = params?.style ?? 'info'
      const duration = params?.duration ?? 300

      console.log('adding new notifications to the div', id)

      notifications.value.push({ id, style, duration, content })
      console.log(notifications.value)
    }),
    remove: $((id: string) => {
      const index = notifications.value.findIndex(n => n.id === id)
      if (index === -1) {
        return
      }

      notifications.value[index].duration = 0
    })
  }
}
