import { auth } from '@/config/auth'
import { AddPass } from '@/features/addPass'
import { getCurrentUserDB } from '@/features/getCurrentUserDB'
import { prisma } from '@/lib/prisma'
import { ChatGate } from '@/widgets/ChatGate'
import { ChatWindow } from '@/widgets/ChatWindow'
import { redirect } from 'next/navigation'

export default async function UserChat({
	params,
}: {
	params: Promise<{ userId: string }>
}) {
	const session = await auth()
	if (!session) redirect('/')

	const { userId } = await params
	const user = await prisma.user.findFirst({ where: { id: userId } })
	const { currentUser } = await getCurrentUserDB()

	const chat = await prisma.chat.findFirst({
		where: {
			AND: [
				{ chatMembers: { some: { user_id: currentUser?.id } } },
				{ chatMembers: { some: { user_id: userId } } },
			],
		},
	})

	if (!chat) {
		// нет общего чата — сюда либо создание чата, либо редирект
		redirect('/')
	}

	const chatPassword = await prisma.chatPassword.findUnique({
		where: { chat_id: chat.chat_id },
	})
	const hasPassword = !!chatPassword

	return (
		<>
			<AddPass existPassword={hasPassword} chat_id={chat.chat_id} />
			<ChatGate chat_id={chat.chat_id} hasPassword={hasPassword}>
				<ChatWindow user={user} chat={chat} currentUser={currentUser} />
			</ChatGate>
		</>
	)
}
