import './globals.css'
import Link from 'next/link'
import { getSessionFromCookie } from '@/lib/auth'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const session = getSessionFromCookie()
  return (
    <html lang="fr">
      <body>
        <nav className="border-b">
          <div className="container flex gap-4 py-3 items-center">
            <Link href="/" className="font-semibold">Brew Build</Link>
            <div className="flex gap-4 text-sm">
              <Link href="/materials">Matériels</Link>
              <Link href="/recipes">Recettes</Link>
              <Link href="/gantt">Gantt</Link>
            </div>
            <div className="ml-auto text-sm">{session ? 'Connecté' : <Link href="/login" className="btn">Se connecter</Link>}</div>
          </div>
        </nav>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  )
}
