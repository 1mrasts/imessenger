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
	})

	return (
		<>
			<h1>Пользователи</h1>
			<ul>
				{allUsers.map(user => (
					<li key={user.id}>
						{user.name} <StartChat user={user} />
					</li>
				))}
			</ul>
		</>
	)
}
