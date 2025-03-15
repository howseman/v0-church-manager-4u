import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
      <p className="mb-8">This is a public page accessible to all users.</p>
      <Button asChild>
        <Link href="/login">Get Started</Link>
      </Button>
    </div>
  )
}
