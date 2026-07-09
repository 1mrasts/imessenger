'use client'

import { addPass } from '@/features/addPass/model/addPass'
import { useState } from 'react'

export function PassPanel({ chat_id }: { chat_id: number }) {
	const [pass, setPass] = useState<string>('')

	return (
		<>
			<input onChange={e => setPass(e.target.value)} />
			<button onClick={() => addPass(chat_id, pass)}>set pass</button>
		</>
	)
}
