'use client'

import { User } from '@/types'

export function StartChat({ user }: { user: User }) {
	function startChat() {
		console.log(`Кнопка начала чата нажата - Пользователь ${user.name}`)
	}
	return <button onClick={startChat}>+</button>
}
