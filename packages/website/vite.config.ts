import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { qwikVite } from '@builder.io/qwik/optimizer'
import { qwikCity } from '@builder.io/qwik-city/vite'

export default defineConfig(() => {
  return {
    plugins: [qwikCity({
      trailingSlash: false
    }),
    qwikVite(),
    tsconfigPaths()
    ],
    server: {
      host: '127.0.0.1',
      port: 5173
    },
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600'
      }
    },
    optimizeDeps: {
      include: ['@auth/core']
    }
  }
})
