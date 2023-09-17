import ky from 'ky'

import Credentials from '@auth/core/providers/credentials'
import { type User } from '@auth/core/types'
import { serverAuth$ } from '@builder.io/qwik-auth'

import { type SigninResponseBody } from '~/types/server/SigninResponseBody'

export const {
  onRequest, useAuthSession,
  useAuthSignin,
  useAuthSignout
} = serverAuth$(({ env }) => {
  return {
    secret: env.get('AUTHJS_SECRET'),
    trustHost: true,
    providers: [
      Credentials({
        name: 'Credentials',
        credentials: {
          usernameOrEmail: { label: 'Username', type: 'text', placeholder: 'itseverydayman' },
          password: { label: 'Password', type: 'password' }
        },
        async authorize (credentials) {
          const endpoint = env.get('FULL_API_LINK')
          if (endpoint == null) {
            throw new Error('api link not found')
          }

          const response = await ky.post(`${endpoint}/auth/signin`, {
            json: {
              username_or_email: credentials.usernameOrEmail,
              password: credentials.password
            }
          })

          if (response.ok) {
            const json = await response.json<SigninResponseBody>()
            const user: User = {
              id: json.id,
              username: json.username,
              role: json.role,
              email: json.email,
              access_token: json.access_token
            }

            return user
          }

          return null
        }
      })
    ],
    callbacks: {
      session: ({ session, user }) => {
        session.user = user
        return session
      }
    }
  }
})
