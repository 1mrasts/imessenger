'use client'

import { SendMessage } from '@/features/sendMessage'
import { useSocket } from '@/lib/SocketProviders' // твой контекст
import { User } from '@/types'
import { useEffect, useState } from 'react'

type Message = {
	user: User
	message_id: number
	message_content: string
	sent_at: Date | string
	chat_id: number
	user_id: string
}

type Props = {
	user: User | null
	messages: Message[]
	chat: {
		chat_id: number
		chat_type: 'chat' | 'group'
		created_at: Date
	} | null
	currentUser: User | null
}

export function ChatWindow({
	user,
	messages: initialMessages,
	chat,
	currentUser,
}: Props) {
	const socket = useSocket()
	const [messages, setMessages] = useState<Message[]>(initialMessages)

	useEffect(() => {
		if (!socket || !chat) return

		socket.emit('join-chat', chat.chat_id)

		function handleNewMessage(message: Message) {
			// защита от дублей на всякий случай
			setMessages(prev => {
				if (prev.some(m => m.message_id === message.message_id)) return prev
				return [...prev, message]
			})
		}

		socket.on('new-message', handleNewMessage)

		return () => {
			socket.emit('leave-chat', chat.chat_id)
			socket.off('new-message', handleNewMessage) // передавать ссылку на функцию, не просто имя события!
		}
	}, [socket, chat?.chat_id])

	return (
		<div>
			<h2>{user?.name}</h2>
			{messages.map(message => {
				const sentAt = new Date(message.sent_at)
				return (
					<p key={message.message_id}>
						{message.user.name}: {message.message_content} - {sentAt.getDate()}.
						{sentAt.getMonth() + 1}.{sentAt.getFullYear()}
					</p>
				)
			})}
			<SendMessage chat={chat} currentUser={currentUser} />
		</div>
	)
}
