import type { Provider } from '@auth/core/providers'
import GitHub from '@auth/core/providers/github'
import { serverAuth$ } from '@builder.io/qwik-auth'

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: 'asdfgjlllmkmvd',
    trustHost: true,
    providers: [
      GitHub({
        clientId: env.get('GITHUB_ID') ?? '',
        clientSecret: env.get('GITHUB_SECRET') ?? ''
      })
    ] as Array<Provider>
  }))
