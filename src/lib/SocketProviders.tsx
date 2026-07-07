// providers/SocketProvider.tsx
'use client'

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import { io, Socket } from 'socket.io-client'

const SocketContext = createContext<Socket | null>(null)

export function SocketProvider({ children }: { children: ReactNode }) {
	const [socket, setSocket] = useState<Socket | null>(null)

	useEffect(() => {
		const newSocket = io(process.env.NEXTAUTH_URL, {
			withCredentials: true,
		})

		// setState вызывается ВНУТРИ колбэка от внешней системы (события 'connect'),
		newSocket.on('connect', () => {
			console.log('Socket подключен:', newSocket.id)
			setSocket(newSocket)
		})

		return () => {
			newSocket.disconnect()
			setSocket(null)
		}
	}, [])

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	)
}

export function useSocket() {
	return useContext(SocketContext)
}
