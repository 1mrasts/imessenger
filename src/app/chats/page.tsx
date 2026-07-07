import { auth } from '@/config/auth'
import { getCurrentUserDB } from '@/features/getCurrentUserDB'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Chats() {
	const session = await auth()

	if (!session) {
		redirect('/')
	}

	const users = await prisma.user.findMany()
	const sessionUserId = users.filter(user => user.name == session.user?.name)[0]
		.id
	const { chatsUserSession } = await getCurrentUserDB()
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
				<li key={user.id}>
					<Link href={`/chats/${user.id}`}>{user.name}</Link>
				</li>
			))}
		</div>
	)
}
