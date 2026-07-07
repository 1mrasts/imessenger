// global.d.ts (в корне проекта, рядом с next-env.d.ts)
import type { Server as SocketIOServer } from 'socket.io'

declare global {
	// eslint-disable-next-line no-var
	var io: SocketIOServer | undefined
}

export {}
