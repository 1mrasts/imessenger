'use client'

import { PassPanel } from '@/widgets/PassPanel'
import { useState } from 'react'

export function AddPass({
	existPassword,
	chat_id,
}: {
	existPassword: boolean
	chat_id: number
}) {
	const [show, setShow] = useState<boolean>(false)
	return (
		<div>
			{existPassword ? (
				<button disabled>Add pass for chat</button>
			) : (
				<button onClick={() => setShow(!show)}>Add pass for chat</button>
			)}
			<div className={show ? 'show' : 'hide'}>
				<PassPanel chat_id={chat_id} />
			</div>
		</div>
	)
}
