'use server'

import { getCurrentUserDB } from '@/features/getCurrentUserDB'
import { prisma } from '@/lib/prisma'

export async function startChat(userId: string) {
	const { currentUser } = await getCurrentUserDB()

	if (!currentUser?.id) {
		return
	}

	await prisma.chat.create({
		data: {
			chat_type: 'chat',
			created_at: new Date(),
			chatMembers: {
				create: [
					{
						user_id: userId,
					},
					{
						user_id: currentUser.id,
					},
				],
			},
		},
	})
}
