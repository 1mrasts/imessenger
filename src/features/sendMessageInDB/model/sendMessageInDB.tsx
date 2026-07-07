'use server'
import { prisma } from '@/lib/prisma'

type Props = {
	chat: {
		chat_id: number
		chat_type: 'chat' | 'group'
		created_at: Date
	} | null
	message: string
	currentUser: {
		id: string
		name: string | null
		email: string
		image: string | null
		emailVerified: Date | null
		createdAt: Date
		updatedAt: Date
	} | null
}

export async function sendMessageInDB({ chat, message, currentUser }: Props) {
	if (!chat?.chat_id || !currentUser?.id)
		throw new Error('Несуществующий чат или пользователь')

	const newMessage = await prisma.message.create({
		data: {
			chat_id: chat.chat_id,
			message_content: message,
			sent_at: new Date(),
			user_id: currentUser?.id,
		},
	})
}
