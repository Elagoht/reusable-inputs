import "@/design/globals.css"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { FC, ReactNode } from "react"

const dmSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Reusable Input Components",
  description: "Reusable input components for Next.js",
}

interface IRootLayoutProps {
  children: ReactNode
}

const RootLayout: FC<IRootLayoutProps> = ({ children }) =>
  <html lang="tr">
    <body className={dmSans.className}>
      {children}
    </body>
  </html>

export default RootLayout