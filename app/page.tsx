import { Navigation } from "@/components/navigation"
import { LivePlayer } from "@/components/live-player"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MessageSquare, Newspaper, Mic, Music, Star } from "lucide-react"
import Link from "next/link"
import { Radio } from "lucide-react" // Import the Radio component

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="container relative px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">jannikjbiFM</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
              Dein Radiosender für die beste Musik, spannende Shows und aktuelle News
            </p>

            <div className="max-w-2xl mx-auto mb-12">
              <LivePlayer currentSong="Shattered Reality" currentArtist="Torsonic" listeners={1247} />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="pulse-glow">
                <Radio className="h-5 w-5 mr-2" />
                Jetzt Live Hören
              </Button>
              <Button variant="outline" size="lg">
                <MessageSquare className="h-5 w-5 mr-2" />
                Song Request
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Live Shows */}
            <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Mic className="h-6 w-6 text-primary" />
                  <CardTitle>Live Shows</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Erlebe unsere DJs live mit den besten Tracks und spannenden Gesprächen.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Jetzt Live:</span>
                    <Badge variant="secondary">DJ Jannik</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Nächste Show:</span>
                    <span className="text-sm text-muted-foreground">20:00 Uhr</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline" asChild>
                  <Link href="/schedule">Programm ansehen</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Music Library */}
            <Card className="bg-card/50 backdrop-blur border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Music className="h-6 w-6 text-accent" />
                  <CardTitle>Musik Bibliothek</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Über 50.000 Songs aus allen Genres - von aktuellen Hits bis zu Klassikern.
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Pop & Rock</div>
                  <div>Electronic</div>
                  <div>Hip-Hop</div>
                  <div>Indie</div>
                  <div>Jazz & Blues</div>
                  <div>Klassik</div>
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline" asChild>
                  <Link href="/requests">Song wünschen</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Community */}
            <Card className="bg-card/50 backdrop-blur border-chart-2/20 hover:border-chart-2/40 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-chart-2" />
                  <CardTitle>Community</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Werde Teil unserer Community und chatte mit anderen Hörern.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Online Hörer:</span>
                    <span className="text-sm font-semibold text-chart-2">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Community Mitglieder:</span>
                    <span className="text-sm font-semibold text-chart-2">8,432</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  Chat beitreten
                </Button>
              </CardContent>
            </Card>

            {/* News */}
            <Card className="bg-card/50 backdrop-blur border-chart-3/20 hover:border-chart-3/40 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Newspaper className="h-6 w-6 text-chart-3" />
                  <CardTitle>Aktuelle News</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm">Neue Show startet nächste Woche</h4>
                    <p className="text-xs text-muted-foreground">DJ Sarah bringt Electronic Vibes</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Festival Coverage</h4>
                    <p className="text-xs text-muted-foreground">Live vom Musikfestival 2025</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline" asChild>
                  <Link href="/news">Alle News</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card className="bg-card/50 backdrop-blur border-chart-4/20 hover:border-chart-4/40 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-6 w-6 text-chart-4" />
                  <CardTitle>Sendeprogramm</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>18:00 - 20:00</span>
                    <span className="text-muted-foreground">Evening Mix</span>
                  </div>
                  <div className="flex justify-between">
                    <span>20:00 - 22:00</span>
                    <span className="text-muted-foreground">Rock Hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>22:00 - 00:00</span>
                    <span className="text-muted-foreground">Night Beats</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline" asChild>
                  <Link href="/schedule">Vollständiges Programm</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-card/50 backdrop-blur border-chart-5/20 hover:border-chart-5/40 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Star className="h-6 w-6 text-chart-5" />
                  <CardTitle>jannikjbiFM Stats</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-chart-5">24/7</div>
                    <div className="text-xs text-muted-foreground">Live Stream</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-chart-5">50k+</div>
                    <div className="text-xs text-muted-foreground">Songs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-chart-5">15</div>
                    <div className="text-xs text-muted-foreground">DJs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-chart-5">8k+</div>
                    <div className="text-xs text-muted-foreground">Hörer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur">
        <div className="container px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Radio className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold gradient-text">jannikjbiFM</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Dein Radiosender für die beste Musik und Entertainment rund um die Uhr.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Navigation</h4>
              <div className="space-y-2 text-sm">
                <Link href="/live" className="block text-muted-foreground hover:text-foreground">
                  Live Stream
                </Link>
                <Link href="/djs" className="block text-muted-foreground hover:text-foreground">
                  DJs
                </Link>
                <Link href="/schedule" className="block text-muted-foreground hover:text-foreground">
                  Programm
                </Link>
                <Link href="/requests" className="block text-muted-foreground hover:text-foreground">
                  Song Requests
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Community</h4>
              <div className="space-y-2 text-sm">
                <Link href="/news" className="block text-muted-foreground hover:text-foreground">
                  News
                </Link>
                <Link href="/chat" className="block text-muted-foreground hover:text-foreground">
                  Chat
                </Link>
                <Link href="/events" className="block text-muted-foreground hover:text-foreground">
                  Events
                </Link>
                <Link href="/contact" className="block text-muted-foreground hover:text-foreground">
                  Kontakt
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Rechtliches</h4>
              <div className="space-y-2 text-sm">
                <Link href="/privacy" className="block text-muted-foreground hover:text-foreground">
                  Datenschutz
                </Link>
                <Link href="/terms" className="block text-muted-foreground hover:text-foreground">
                  AGB
                </Link>
                <Link href="/imprint" className="block text-muted-foreground hover:text-foreground">
                  Impressum
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 jannikjbiFM. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
