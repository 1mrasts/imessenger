'use client'
import { checkPass } from '@/features/checkPass/model/checkPass'
import { useState } from 'react'

export function ChatGate({
	chat_id,
	hasPassword,
	children,
}: {
	chat_id: number
	hasPassword: boolean
	children: React.ReactNode
}) {
	const [unlocked, setUnlocked] = useState(!hasPassword)
	const [pass, setPass] = useState('')
	const [error, setError] = useState<string | null>(null)

	if (unlocked) return <>{children}</> // ChatWindow монтируется только тут

	return (
		<div>
			<input
				type='password'
				value={pass}
				onChange={e => setPass(e.target.value)}
			/>
			<button
				onClick={async () => {
					const res = await checkPass(chat_id, pass)
					if (res.ok) setUnlocked(true)
					else
						setError(res.locked ? 'Слишком много попыток' : 'Неверный пароль')
				}}
			>
				Открыть чат
			</button>
			{error && <p>{error}</p>}
		</div>
	)
}
