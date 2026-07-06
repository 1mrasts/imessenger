import type { Metadata } from 'next'
import styles from './page.module.css'

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
	return (
		<main className={styles.main}>
			<h1>Главная</h1>
		</main>
	)
}
