import { auth } from '@/config/auth'
import { getCurrentUserDB } from '@/features/getCurrentUserDB'
import { prisma } from '@/lib/prisma'

export default async function Chats() {
	const sessions = await auth()

	const users = await prisma.user.findMany()
	const sessionUserId = users.filter(
		user => user.name == sessions?.user?.name,
	)[0].id
	const chatsUserSession = await getCurrentUserDB()
	const allChatsMembers = await prisma.chatMembers.findMany({
		where: {
			chat_id: {
				in: chatsUserSession.map(chat => chat.chat_id),
			},
			user_id: {
				not: sessionUserId,
			},
		},
	})
	const usersName = await prisma.user.findMany({
		where: {
			id: {
				in: allChatsMembers.map(memberId => memberId.user_id),
			},
		},
	})

	return (
		<div>
			<h1>Чаты</h1>
			{usersName.map(user => (
				<li key={user.id}>{user.name}</li>
			))}
		</div>
	)
}
