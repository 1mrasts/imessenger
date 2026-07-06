import SignIn from '@/app/signIn/page'
import SignOut from '@/app/signout/page'
import { auth } from '@/config/auth'
import Link from 'next/link'

export default async function Header() {
	const session = await auth()
	return (
		<header>
			<nav>
				<ul>
					{session?.user ? (
						<>
							<li>{session?.user?.name}</li>
							<li>
								<Link href='/profile'>Профиль</Link>
							</li>
							<li>
								<Link href='/friends'>Пользователи</Link>
							</li>
							<li>
								<Link href='/chats'>Чаты</Link>
							</li>
						</>
					) : (
						<></>
					)}
					{session?.user ? <SignOut /> : <SignIn />}
				</ul>
			</nav>
		</header>
	)
}
