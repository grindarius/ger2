import { type RequestEventLoader, routeLoader$ } from '@builder.io/qwik-city'
import { PostgresJsAdapter } from '@lucia-auth/adapter-postgresql'
import { Kysely } from 'kysely'
import { PostgresJSDialect } from 'kysely-postgres-js'
import { Lucia, type Session, TimeSpan, type User } from 'lucia'
import postgres from 'postgres'
import type { Database, Users } from '~/types/database'

export const sql = postgres({
  host: '127.0.0.1',
  port: 7321,
  user: 'postgres',
  password: 'postgres',
  db: 'ger2'
})

export const k = new Kysely<Database>({
  dialect: new PostgresJSDialect({
    postgres: sql
  })
})

const adapter = new PostgresJsAdapter(sql, { user: 'users', session: 'user_sessions' })
export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, 'w'),
  sessionCookie: {
    attributes: {
      secure: process.env?.NODE_ENV === 'production'
    }
  },
  getUserAttributes: attributes => {
    return {
      role: attributes.role,
      username: attributes.username,
      email: attributes.email
    }
  }
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: Omit<Users, 'id'>
  }
}

export const getSession = async (
  event: RequestEventLoader
): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
  const sessionId = event.cookie.get(lucia.sessionCookieName)

  if (sessionId == null) {
    return {
      user: null,
      session: null
    }
  }

  const result = await lucia.validateSession(sessionId.value)
  if (result.session?.fresh) {
    event.headers.append('Set-Cookie', lucia.createSessionCookie(result.session.id).serialize())
  }
  if (result.session == null) {
    // Create new cookie to expire the current one immediately
    event.headers.append('Set-Cookie', lucia.createBlankSessionCookie().serialize())
  }

  return result
}
