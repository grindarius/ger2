// eslint-disable-next-line
import { DefaultSession, DefaultUser } from '@auth/core/types'
import type { Role } from './server/Role'

declare module '@auth/core/types' {
  interface User {
    id: string
    username: string
    access_token: string
    email: string
    role: Role
  }

  interface Session {
    user: {
      id: string
      username: string
      access_token: string
      email: string
      role: string
    }
    expires: string
  }

  interface Session {
    user: User & { role: Role }
  }
}
