import { Inter } from 'next/font/google'
import './globals.scss'
import { CookiesProvider } from 'next-client-cookies/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kipbite Bingo!',
  description: 'Bingo sheet for when twitch.tv/kipbite plays certain games.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CookiesProvider>
        <body className={inter.className}>{children}</body>
      </CookiesProvider>
    </html>
  )
}
