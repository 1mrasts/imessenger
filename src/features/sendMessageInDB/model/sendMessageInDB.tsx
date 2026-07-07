'use server'
import { prisma } from '@/lib/prisma'
import { Server } from 'socket.io'

// Говорим TypeScript, что на globalThis реально есть io —
// он кладётся туда в server.ts строкой globalThis.io = io
declare global {
	// eslint-disable-next-line no-var
	var io: Server | undefined
}

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

	if (!message.trim()) throw new Error('Сообщение не может быть пустым')

	const newMessage = await prisma.message.create({
		data: {
			chat_id: chat.chat_id,
			message_content: message,
			sent_at: new Date(),
			user_id: currentUser.id,
		},
		include: { user: true }, // добавляем автора, т.к. ChatWindow ждёт message.user.name
	})

	console.log('io существует?', !!globalThis.io) // <-- временный дебаг
	// Рассылаем всем в комнате чата (включая отправителя), чтобы сообщение появилось у всех realtime
	globalThis.io?.to(`chat:${chat.chat_id}`).emit('new-message', newMessage)

	return newMessage
}
