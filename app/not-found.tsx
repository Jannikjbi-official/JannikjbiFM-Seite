import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Seite nicht gefunden</h2>
          <p className="text-muted-foreground max-w-md">
            Die Seite, die du suchst, existiert nicht oder wurde verschoben.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">Zur Startseite</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/live">Live Stream</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
