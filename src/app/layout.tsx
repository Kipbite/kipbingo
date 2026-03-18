import { Inter } from 'next/font/google'
import './globals.scss'
import { ChildElement } from './types'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kipbite Bingo!',
  description: 'Bingo sheet for when twitch.tv/kipbite plays certain games.',
}

interface Props {
  children: ChildElement
}

export default function RootLayout( { children }: Props ) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        { children }
      </body>
    </html>
  )
}
