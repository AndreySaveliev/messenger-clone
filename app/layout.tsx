import './globals.css'
import ToasterContext from './context/ToasterContex'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MESSENGER',
  description: 'COOL MESSENGER',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterContext />
        {children}</body>
    </html>
  )
}
