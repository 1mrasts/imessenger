'use server'

import { auth } from '@/config/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function addPass(chat_id: number, password: string) {
	const session = await auth()
	if (!session?.user?.id) throw new Error('Unauthorized')

	// проверяем, что юзер реально состоит в этом чате
	const isMember = await prisma.chatMembers.findFirst({
		where: { chat_id, user_id: session.user.id },
	})
	if (!isMember) throw new Error('Forbidden')

	if (password.length < 4) throw new Error('Password too short')

	const password_hash = await bcrypt.hash(password, 10)

	await prisma.chatPassword.upsert({
		where: { chat_id },
		create: { chat_id, user_id: session.user.id, password_hash },
		update: { password_hash, failed_attempts: 0, locked_until: null },
	})

	return { success: true }
}
