import './globals.css'
import type { Metadata } from 'next'
import { inter } from '@/app/ui/fonts'

export const metadata: Metadata = {
  title: '',
  description: ''
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased max-h-screen pt-10`}>
        <main className="p-10 max-w-5xl m-auto">{children}</main>
      </body>
    </html>
  )
}
