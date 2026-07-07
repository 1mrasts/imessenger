import { auth } from '@/config/auth'
import { getCurrentUserDB } from '@/features/getCurrentUserDB'
import { SendMessage } from '@/features/sendMessage'
import { prisma } from '@/lib/prisma'
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
		<div>
			<h2>{user?.name}</h2>
			{messages.map(message => (
				<p key={message.message_id}>
					{message.user.name}: {message.message_content} -{' '}
					{message.sent_at.getDate()}.{message.sent_at.getMonth() + 1}.
					{message.sent_at.getFullYear()}
				</p>
			))}
			<SendMessage chat={chat} currentUser={currentUser} />
		</div>
	)
}
