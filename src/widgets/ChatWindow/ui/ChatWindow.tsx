'use client'

import { getMessages } from '@/features/getMessage'
import { SendMessage } from '@/features/sendMessage'
import { useSocket } from '@/lib/SocketProviders'
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
	chat: {
		chat_id: number
		chat_type: 'chat' | 'group'
		created_at: Date
	} | null
	currentUser: User | null
}

export function ChatWindow({ user, chat, currentUser }: Props) {
	const socket = useSocket()
	const [messages, setMessages] = useState<Message[]>([])
	const [loading, setLoading] = useState(true)

	// загрузка сообщений — только когда ChatWindow реально смонтирован (т.е. после ChatGate)
	useEffect(() => {
		if (!chat) return
		let cancelled = false

		getMessages(chat.chat_id).then(data => {
			if (!cancelled) {
				setMessages(data)
				setLoading(false)
			}
		})

		return () => {
			cancelled = true
		}
	}, [chat?.chat_id])

	useEffect(() => {
		if (!socket || !chat) return

		socket.emit('join-chat', chat.chat_id)

		function handleNewMessage(message: Message) {
			setMessages(prev => {
				if (prev.some(m => m.message_id === message.message_id)) return prev
				return [...prev, message]
			})
		}

		socket.on('new-message', handleNewMessage)

		return () => {
			socket.emit('leave-chat', chat.chat_id)
			socket.off('new-message', handleNewMessage)
		}
	}, [socket, chat?.chat_id])

	if (loading) return <p>Загрузка...</p>

	return (
		<div>
			<div className='chatUser'>
				<h2>{user?.name}</h2>
			</div>
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
