import Head from 'next/head'
import { signOut } from 'next-auth/react'
import MusicTimer from '../components/MusicTimer'

export default function Home() {
  return (
    <>
      <Head>
        <title>melodoro</title>
        <meta name="description" content="Pomodoro app that connects with your Spotify" />
        <link href="/favicon.ico" rel="icon" type="image/x-icon" />
      </Head>
      <header className="flex justify-between px-12 py-8 text-3xl">
        <h1>melodoro</h1>
        <div><button onClick={() => signOut()}>log out</button></div>
      </header>
      <div className="grid text-center px-12 py-8 text-4xl">
        <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <MusicTimer />
        </main>
      </div>
    </>
  )
}
