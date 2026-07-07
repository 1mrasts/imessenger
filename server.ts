import { createServer } from 'http'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	const httpServer = createServer((req, res) => handle(req, res))

	const io = new Server(httpServer, {
		cors: {
			origin: process.env.APP_URL,
			credentials: true,
		},
	})
	io.on('connection', socket => {
		console.log('Клиент подключился:', socket.id)

		socket.on('join-chat', (chatId: string) => {
			console.log(`${socket.id} присоединился к чату ${chatId}`)
			socket.join(`chat:${chatId}`)
		})

		socket.on('leave-chat', (chatId: string) => {
			socket.leave(`chat:${chatId}`)
		})

		socket.on('disconnect', () => {
			console.log('Клиент отключился:', socket.id)
		})
	})

	globalThis.io = io

	httpServer.listen(3000, () => {
		console.log('Server ready on http://localhost:3000')
	})
})
