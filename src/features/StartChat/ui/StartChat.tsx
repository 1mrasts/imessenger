'use client'

import { User } from '@/types'
import { redirect } from 'next/navigation'
import { startChat } from '../model/startChat'

export function StartChat({ user }: { user: User }) {
	async function handleStartChat() {
		await startChat(user.id)
		redirect(`/chats/${user.id}`)
	}
	return <button onClick={handleStartChat}>+</button>
}
