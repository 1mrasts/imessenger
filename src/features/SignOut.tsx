import { auth, signOut } from '@/config/auth'

export default async function SignOut() {
	const session = await auth()

	if (!session?.user) return null

	return (
		<div>
			{session.user.name}
			<form
				action={async () => {
					'use server'
					await signOut()
				}}
			>
				<button>Sign Out</button>
			</form>
		</div>
	)
}
