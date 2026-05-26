import type { Metadata } from 'next'
import '../styles/globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'IvanJulia - Digital Wedding Invitation',
  description: 'Experience our wedding invitation Netflix-style',
  icons: {
    icon: '/image/icon.png',
    apple: '/image/icon.png',
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
