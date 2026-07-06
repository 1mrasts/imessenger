import { signIn } from '@/config/auth'

export default async function SignIn() {
	return (
		<li>
			<form
				action={async () => {
					'use server'
					await signIn('google', { redirectTo: '/profile', redirect: true })
				}}
			>
				<button type='submit'>Signin with Google</button>
			</form>
		</li>
	)
}
