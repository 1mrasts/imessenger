'use client'

import { sendMessageInDB } from '@/features/sendMessageInDB'
import { useState } from 'react'

type Props = {
	chat: {
		chat_id: number
		chat_type: 'chat' | 'group'
		created_at: Date
	} | null
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

export function SendMessage({ chat, currentUser }: Props) {
	const [message, setMessage] = useState<string>('')

	async function handleClick() {
		await sendMessageInDB({ chat, message, currentUser })
	}
	return (
		<div>
			<input type='text' onChange={e => setMessage(e.target.value)} />
			<button onClick={handleClick}>send</button>
		</div>
	)
}
