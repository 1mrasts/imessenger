import { auth } from '@/config/auth'
import { getCurrentUserDB } from '@/features/getCurrentUserDB'
import { StartChat } from '@/features/StartChat'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function UsersList() {
	const session = await auth()

	if (!session) {
		redirect('/')
	}

	const { currentUser } = await getCurrentUserDB()
	const allUsers = await prisma.user.findMany({
		where: {
			name: { not: currentUser?.name },
		},
		include: {
			chatMembers: {
				where: {
					chat: {
						chat_type: 'chat',
						AND: [
							{
								chatMembers: {
									some: {
										user_id: currentUser?.id,
									},
								},
							},
						],
					},
				},
				include: {
					chat: true,
				},
			},
		},
	})

	return (
		<>
			<h1>Пользователи</h1>
			<ul>
				{allUsers.map(user => {
					const hasChat = user.chatMembers.length > 0

					return (
						<li key={user.id}>
							{user.name}

							{hasChat ? (
								<button disabled>+</button>
							) : (
								<StartChat user={user} />
							)}
						</li>
					)
				})}
			</ul>
		</>
	)
}
