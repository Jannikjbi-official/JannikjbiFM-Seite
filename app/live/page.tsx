import { Navigation } from "@/components/navigation"
import { LivePlayer } from "@/components/live-player"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Heart, Share2, MessageCircle, Clock, Users, Radio } from "lucide-react"

export default function LivePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Player Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                <h1 className="text-2xl font-bold">Live Stream</h1>
                <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                  ON AIR
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>1,247 Hörer</span>
              </div>
            </div>

            {/* Enhanced Live Player */}
            <LivePlayer currentSong="Shattered Reality" currentArtist="Torsonic" listeners={1247} />

            {/* Current Show Info */}
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Radio className="h-5 w-5 text-primary" />
                    <span>Aktuelle Show</span>
                  </CardTitle>
                  <Badge variant="outline">18:00 - 20:00</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/dj-jannik.jpg" />
                    <AvatarFallback>DJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">Evening Mix mit DJ Jannik</h3>
                    <p className="text-muted-foreground">
                      Die besten Hits und neue Entdeckungen für den perfekten Feierabend
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Show Progress</span>
                    <span>45 min verbleibend</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Show folgen
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Teilen
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recently Played */}
            <Card className="bg-card/50 backdrop-blur border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <span>Zuletzt gespielt</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "19:42", song: "Shattered Reality", artist: "Torsonic", playing: true },
                    { time: "19:38", song: "Electric Dreams", artist: "Synthwave Collective", playing: false },
                    { time: "19:34", song: "Midnight Drive", artist: "Neon Nights", playing: false },
                    { time: "19:30", song: "Digital Love", artist: "Cyber Romance", playing: false },
                    { time: "19:26", song: "Future Bass", artist: "Electronic Vibes", playing: false },
                  ].map((track, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        track.playing ? "bg-primary/10 border border-primary/20" : "bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-sm text-muted-foreground w-12">{track.time}</div>
                        <div>
                          <div className={`font-medium ${track.playing ? "text-primary" : ""}`}>{track.song}</div>
                          <div className="text-sm text-muted-foreground">{track.artist}</div>
                        </div>
                      </div>
                      {track.playing && (
                        <div className="flex items-center space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 h-4 bg-primary rounded wave-animation"
                              style={{ animationDelay: `${i * 0.2}s` }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stream Quality */}
            <Card className="bg-card/50 backdrop-blur border-chart-2/20">
              <CardHeader>
                <CardTitle className="text-lg">Stream Qualität</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bitrate:</span>
                    <Badge variant="outline">320 kbps</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Format:</span>
                    <Badge variant="outline">MP3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Latenz:</span>
                    <Badge variant="outline" className="text-green-400 border-green-400/30">
                      12ms
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Status:</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Shows */}
            <Card className="bg-card/50 backdrop-blur border-chart-3/20">
              <CardHeader>
                <CardTitle className="text-lg">Kommende Shows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "20:00", show: "Rock Hour", dj: "DJ Sarah", duration: "2h" },
                    { time: "22:00", show: "Night Beats", dj: "DJ Mike", duration: "2h" },
                    { time: "00:00", show: "Late Night Mix", dj: "DJ Alex", duration: "4h" },
                  ].map((show, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
                      <div className="text-sm font-medium text-chart-3 w-12">{show.time}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{show.show}</div>
                        <div className="text-xs text-muted-foreground">
                          {show.dj} • {show.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Vollständiges Programm
                </Button>
              </CardContent>
            </Card>

            {/* Live Stats */}
            <Card className="bg-card/50 backdrop-blur border-chart-4/20">
              <CardHeader>
                <CardTitle className="text-lg">Live Statistiken</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-chart-4">1,247</div>
                    <div className="text-sm text-muted-foreground">Aktuelle Hörer</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-semibold text-chart-4">2,891</div>
                      <div className="text-xs text-muted-foreground">Peak heute</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-chart-4">24/7</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Deutschland</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-1" />
                    <div className="flex justify-between text-sm">
                      <span>Österreich</span>
                      <span>18%</span>
                    </div>
                    <Progress value={18} className="h-1" />
                    <div className="flex justify-between text-sm">
                      <span>Schweiz</span>
                      <span>14%</span>
                    </div>
                    <Progress value={14} className="h-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
