import { auth } from '@/config/auth'
import SignOut from '@/features/SignOut'
import type { Metadata } from 'next'
import styles from './page.module.css'
import SignIn from './signIn/page'

export const metadata: Metadata = {
	title: 'Главная | I-Messenger',
	description:
		'Это главная страница мессенджера I-Messenger. Здесь вся информация о мессенджере.',
	authors: [
		{ name: 'Imrasts', url: 'https://imrasts.ru/' },
		{ name: 'I-Company' },
	],
	keywords: [
		'Messenger',
		'I-Messenger',
		'I-Company',
		'Мессенджер',
		'Безопасность',
		'Imrasts',
	],
}

export default async function Home() {
	const session = await auth()
	return (
		<main className={styles.main}>
			<p>Главная</p>
			{session?.user ? <SignOut /> : <SignIn />}
		</main>
	)
}
