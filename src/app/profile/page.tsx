import { auth, signOut } from '@/config/auth'
import { redirect } from 'next/navigation'

export default async function Profile() {
	const session = await auth()

	if (!session) {
		redirect('/')
	}

	return (
		<main>
			Name: {session?.user?.name}
			<form
				action={async () => {
					'use server'
					await signOut({ redirectTo: '/' })
				}}
			>
				<button>Unlogin</button>
			</form>
		</main>
	)
}
