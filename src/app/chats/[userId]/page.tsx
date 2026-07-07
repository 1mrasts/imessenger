import { auth } from '@/config/auth'
import { getCurrentUserDB } from '@/features/getCurrentUserDB'
import { prisma } from '@/lib/prisma'
import { ChatWindow } from '@/widgets/ChatWindow'
import { redirect } from 'next/navigation'

export default async function UserChat({
	params,
}: {
	params: Promise<{ userId: string }>
}) {
	const session = await auth()

	if (!session) {
		redirect('/')
	}
	const { userId } = await params
	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
	})
	const { currentUser } = await getCurrentUserDB()

	// Находим чат в котором существуют пользователи (по базе chatMembers) currentUser и userId пользователя с которым идёт диалог
	const chat = await prisma.chat.findFirst({
		where: {
			AND: [
				{ chatMembers: { some: { user_id: currentUser?.id } } },
				{ chatMembers: { some: { user_id: userId } } },
			],
		},
	})
	const messages = await prisma.message.findMany({
		where: { chat_id: chat?.chat_id },
		orderBy: { sent_at: 'asc' },
		include: { user: true },
	})

	return (
		<ChatWindow
			user={user}
			messages={messages}
			chat={chat}
			currentUser={currentUser}
		/>
	)
}
