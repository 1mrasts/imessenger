import { signOut } from '@/config/auth'

export default async function SignOut() {
	return (
		<li>
			<form
				action={async () => {
					'use server'
					await signOut()
				}}
			>
				<button>Sign Out</button>
			</form>
		</li>
	)
}
