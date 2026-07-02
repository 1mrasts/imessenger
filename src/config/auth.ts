import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
	// Адаптер для Prisma - синхронизации между базы данных
	adapter: PrismaAdapter(prisma),
	providers: [Google],
})
