import { component$ } from '@builder.io/qwik'

export default component$(() => {
  return (
    <div>
      Forum's settings page, only authorized viewers can view this, you can set forum's - post
      ability. - banning/kicking user off of a forum. - closing a forum. - giving users some roles
      and permissions, moderators sytems.

      custom sidebar needed with things like

      - Roles
      - Audit logs
      - Members
      - Approvals
      - Ban appeals
    </div>
  )
})
