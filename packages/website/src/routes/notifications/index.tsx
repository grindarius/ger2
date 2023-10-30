import { $, component$, useContext } from '@builder.io/qwik'

import { NotificationsContext, useNotifications } from '~/components/notification/notification-provider'

export default component$(() => {
  const notifications = useNotifications()
  const notifs = useContext(NotificationsContext)

  const addToast = $(() => {
    void notifications.add('who')
  })

  return (
    <main class="container pt-4 mx-auto w-full bg-base-100 px-4 lg:px-0">
      <button type="button" class="btn btn-primary" onClick$={addToast}>launch notification</button>
      <div class="text-white">
        {notifs.value.length}
        {notifs.value.map(n => n.id).join(' ,')}
      </div>
    </main>
  )
})
