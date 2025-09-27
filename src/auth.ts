import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'

export const config = {
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Usuario', type: 'text' },
        password: { label: 'Contraseña', type: 'password' }
      },
      authorize: async (credentials) => {
        // Usuario único del sistema
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'info@atenea.sv'
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Atenea@2025#SecurePanel!'

        if (
          credentials?.username === ADMIN_USERNAME &&
          credentials?.password === ADMIN_PASSWORD
        ) {
          return {
            id: '1',
            name: 'Administrador',
            email: 'info@atenea.sv'
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/panel/login',
    signOut: '/',
    error: '/panel/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnPanel = nextUrl.pathname.startsWith('/panel')
      const isOnLogin = nextUrl.pathname === '/panel/login'

      if (isOnPanel && !isOnLogin) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }

      return true
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'atenea-secret-key-2025',
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)