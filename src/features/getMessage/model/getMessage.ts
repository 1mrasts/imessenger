// features/getMessages/model/getMessages.ts
'use server'

import { auth } from '@/config/auth'
import { prisma } from '@/lib/prisma'

export async function getMessages(chat_id: number) {
	const session = await auth()
	if (!session?.user?.id) throw new Error('Unauthorized')

	const isMember = await prisma.chatMembers.findFirst({
		where: { chat_id, user_id: session.user.id },
	})
	if (!isMember) throw new Error('Forbidden')

	return prisma.message.findMany({
		where: { chat_id },
		orderBy: { sent_at: 'asc' },
		include: { user: true },
	})
}
