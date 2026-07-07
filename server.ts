import { createServer } from 'http'
import next from 'next'
import { Server } from 'socket.io'

// Проверяем, запущено ли приложение в режиме разработки
const dev = process.env.NODE_ENV !== 'production'

// Создаём экземпляр Next.js
const app = next({ dev })

// Получаем обработчик всех HTTP-запросов Next.js
const handle = app.getRequestHandler()

// Дожидаемся полной подготовки Next.js
app.prepare().then(() => {
	// Создаём HTTP-сервер, через который будет работать Next.js
	const httpServer = createServer((req, res) => handle(req, res))

	// Подключаем Socket.IO к этому же HTTP-серверу
	const io = new Server(httpServer, {
		cors: {
			// Разрешаем подключения только с указанного домена
			origin: process.env.APP_URL,

			// Разрешаем передачу cookies и других credentials
			credentials: true,
		},
	})

	// Срабатывает при подключении нового клиента
	io.on('connection', socket => {
		console.log('Клиент подключился:', socket.id)

		// Клиент запрашивает подключение к определённому чату
		socket.on('join-chat', (chatId: string) => {
			console.log(`${socket.id} присоединился к чату ${chatId}`)

			// Добавляем сокет в комнату этого чата
			socket.join(`chat:${chatId}`)
		})

		// Клиент покидает комнату чата
		socket.on('leave-chat', (chatId: string) => {
			socket.leave(`chat:${chatId}`)
		})

		// Срабатывает при отключении клиента
		socket.on('disconnect', () => {
			console.log('Клиент отключился:', socket.id)
		})
	})

	// Сохраняем экземпляр Socket.IO глобально,
	// чтобы можно было отправлять события из любого места приложения
	globalThis.io = io

	// Запускаем HTTP-сервер
	httpServer.listen(3000, () => {
		console.log('Server ready on http://localhost:3000')
	})
})
