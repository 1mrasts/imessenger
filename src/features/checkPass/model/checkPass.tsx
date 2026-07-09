'use server'

import { auth } from '@/config/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const MAX_ATTEMPTS = 5
const LOCK_MINUTES = 5

export async function checkPass(chat_id: number, password: string) {
	const session = await auth()
	if (!session?.user?.id) throw new Error('Unauthorized')

	const isMember = await prisma.chatMembers.findFirst({
		where: { chat_id, user_id: session.user.id },
	})
	if (!isMember) throw new Error('Forbidden')

	const record = await prisma.chatPassword.findUnique({ where: { chat_id } })
	if (!record) return { ok: true }

	if (record.locked_until && record.locked_until > new Date()) {
		return { ok: false, locked: true, until: record.locked_until }
	}

	const match = await bcrypt.compare(password, record.password_hash)

	if (!match) {
		const attempts = record.failed_attempts + 1
		const shouldLock = attempts >= MAX_ATTEMPTS

		await prisma.chatPassword.update({
			where: { chat_id },
			data: {
				failed_attempts: shouldLock ? 0 : attempts,
				locked_until: shouldLock
					? new Date(Date.now() + LOCK_MINUTES * 60_000)
					: null,
			},
		})

		return { ok: false, locked: shouldLock }
	}

	await prisma.chatPassword.update({
		where: { chat_id },
		data: { failed_attempts: 0, locked_until: null },
	})

	return { ok: true }
}
