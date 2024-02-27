import { $, component$, useContext } from '@builder.io/qwik'

import { NotificationsContext, useNotifications } from '~/components/notification/notification-provider'

export default component$(() => {
  const notifications = useNotifications()
  const notifs = useContext(NotificationsContext)

  const addToast = $(() => {
    void notifications.add('longggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggblahblahblahblahblah', { style: 'warning' })
  })

  return (
    <main class="container px-4 pt-4 mx-auto w-full lg:px-0 bg-base-100">
      <button type="button" class="btn btn-primary" onClick$={addToast}>launch notification</button>
      <div class="text-white">
        {notifs.value.length}
        {notifs.value.map(n => n.id).join(' ,')}
      </div>
    </main>
  )
})
