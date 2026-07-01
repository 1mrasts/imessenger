import { signIn } from '@/config/auth'

export default function SignIn() {
	return (
		<form
			action={async () => {
				'use server'
				await signIn('google', { redirectTo: '/profile', redirect: true })
			}}
		>
			<button type='submit'>Signin with Google</button>
		</form>
	)
}
