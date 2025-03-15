import type React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CHURCH_NAME } from "@/constants"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-100 py-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            My App
          </Link>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-grow container mx-auto py-8">{children}</main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto text-center">©{(new Date().getFullYear())} {CHURCH_NAME}. All rights reserved.</div>
      </footer>
    </div>
  )
}
