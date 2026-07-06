import { auth } from '@/config/auth'
import { prisma } from '@/lib/prisma'

export async function getCurrentUserDB() {
	const sessions = await auth()

	const users = await prisma.user.findMany()
	const sessionUserId = users.filter(
		user => user.name == sessions?.user?.name,
	)[0].id
	const chatsUserSession = await prisma.chatMembers.findMany({
		where: { user_id: sessionUserId },
	})
	const currentUser = await prisma.user.findFirst({
		where: {
			name: sessions?.user?.name,
		},
	})
	return {
		chatsUserSession,
		currentUser,
	}
}
