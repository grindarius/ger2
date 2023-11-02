import { $, createContextId, type QRL, useContext, useContextProvider, useStore } from '@builder.io/qwik'

export interface Notification {
  id: string
  style: 'error' | 'info' | 'success' | 'warning'
  content: string
  duration: number
}

export interface NotificationsContextType {
  value: Array<Notification>
}

export const NotificationsContext = createContextId<NotificationsContextType>('notifications-context')

export const useNotificationsProvider = (): void => {
  const notifications = useStore<NotificationsContextType>({ value: [] })
  useContextProvider(NotificationsContext, notifications)
}

export interface UseNotifications {
  add: QRL<(content: string, params?: Partial<Omit<Notification, 'id'>>) => void>
}

export const useNotifications = (): UseNotifications => {
  const notifications = useContext(NotificationsContext)

  return {
    add: $((content, params) => {
      const id = crypto.randomUUID()
      const style = params?.style ?? 'info'
      const duration = params?.duration ?? 1500

      notifications.value.push({ id, style, duration, content })
    })
  }
}
