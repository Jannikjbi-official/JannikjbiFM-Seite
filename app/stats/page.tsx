import { Navigation } from "@/components/navigation"
import { AzuraCastStats } from "@/components/azuracast-stats"

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Station Statistiken</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Live-Statistiken und Einblicke in jannikjbiFM
          </p>
        </div>

        {/* AzuraCast Stats */}
        <AzuraCastStats />
      </div>
    </div>
  )
}
