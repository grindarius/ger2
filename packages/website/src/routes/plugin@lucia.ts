import { PostgresJsAdapter } from '@lucia-auth/adapter-postgresql'
import { Lucia, TimeSpan } from 'lucia'
import postgres from 'postgres'
import { AccountSessions, Accounts } from '~/types/database'

import { webcrypto } from 'node:crypto'
globalThis.crypto = webcrypto as Crypto

export const sql = postgres({
  host: '127.0.0.1',
  port: 7321,
  user: 'postgres',
  password: 'postgres',
  db: 'ger2'
})

const adapter = new PostgresJsAdapter(sql, { user: 'accounts', session: 'account_sessions' })
export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, 'w'),
  sessionCookie: {
    attributes: {
      secure: process.env?.NODE_ENV === 'production'
    }
  },
  getSessionAttributes: attributes => {
    return {
      account_id: attributes.account_id,
      expires: attributes.expires
    }
  },
  getUserAttributes: attributes => {
    return {
      id: attributes.id,
      role: attributes.role,
      username: attributes.username,
      email: attributes.email
    }
  }
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: Accounts
    DatabaseSessionAttributes: AccountSessions
  }
}
