import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'NetWedding - Digital Wedding Invitation',
  description: 'Experience our wedding invitation Netflix-style',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-netflix-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
