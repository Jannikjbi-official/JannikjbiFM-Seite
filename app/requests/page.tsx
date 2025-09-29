import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, Clock, User, Send, TrendingUp, Star, ThumbsUp, Play } from "lucide-react"

const recentRequests = [
  {
    id: 1,
    song: "Blinding Lights",
    artist: "The Weeknd",
    requester: "MusicLover23",
    time: "vor 2 Min",
    votes: 15,
    status: "pending",
    message: "Bitte spielt das! Perfekt für die Abendstimmung 🎵",
  },
  {
    id: 2,
    song: "As It Was",
    artist: "Harry Styles",
    requester: "PopFan2024",
    time: "vor 5 Min",
    votes: 12,
    status: "playing",
    message: "Läuft gerade bei mir im Auto, würde es gerne nochmal hören!",
  },
  {
    id: 3,
    song: "Heat Waves",
    artist: "Glass Animals",
    requester: "IndieVibes",
    time: "vor 8 Min",
    votes: 8,
    status: "played",
    message: "Klassiker! Danke für den tollen Stream",
  },
  {
    id: 4,
    song: "Anti-Hero",
    artist: "Taylor Swift",
    requester: "SwiftieForever",
    time: "vor 12 Min",
    votes: 22,
    status: "pending",
    message: "Neuer Taylor Swift Hit! Bitte bitte bitte 🙏",
  },
  {
    id: 5,
    song: "Flowers",
    artist: "Miley Cyrus",
    requester: "RadioFan88",
    time: "vor 15 Min",
    votes: 6,
    status: "declined",
    message: "Toller Song für den Abend",
  },
]

const topRequests = [
  { song: "Blinding Lights", artist: "The Weeknd", requests: 45 },
  { song: "As It Was", artist: "Harry Styles", requests: 38 },
  { song: "Anti-Hero", artist: "Taylor Swift", requests: 32 },
  { song: "Heat Waves", artist: "Glass Animals", requests: 28 },
  { song: "Flowers", artist: "Miley Cyrus", requests: 24 },
]

export default function RequestsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Song Requests</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Wünsche dir deinen Lieblingssong und stimme für andere Requests ab
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Request Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Music className="h-5 w-5 text-primary" />
                  <span>Song Request senden</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Song Titel</label>
                    <Input placeholder="z.B. Blinding Lights" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Künstler</label>
                    <Input placeholder="z.B. The Weeknd" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Dein Name</label>
                  <Input placeholder="Wie sollen wir dich nennen?" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Nachricht (optional)</label>
                  <Textarea placeholder="Warum möchtest du diesen Song hören?" className="resize-none" rows={3} />
                </div>
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Request senden
                </Button>
              </CardContent>
            </Card>

            {/* Recent Requests */}
            <Card className="bg-card/50 backdrop-blur border-accent/20">
              <CardHeader>
                <CardTitle>Aktuelle Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">Alle</TabsTrigger>
                    <TabsTrigger value="pending">Wartend</TabsTrigger>
                    <TabsTrigger value="playing">Läuft</TabsTrigger>
                    <TabsTrigger value="played">Gespielt</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4 mt-6">
                    {recentRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 border border-border/40"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{request.requester.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-sm">{request.song}</h4>
                              <p className="text-sm text-muted-foreground">{request.artist}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  request.status === "playing"
                                    ? "default"
                                    : request.status === "played"
                                      ? "secondary"
                                      : request.status === "declined"
                                        ? "destructive"
                                        : "outline"
                                }
                                className={request.status === "playing" ? "bg-green-500 text-white" : ""}
                              >
                                {request.status === "playing" && <Play className="h-3 w-3 mr-1" />}
                                {request.status === "pending" && "Wartend"}
                                {request.status === "playing" && "Läuft"}
                                {request.status === "played" && "Gespielt"}
                                {request.status === "declined" && "Abgelehnt"}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{request.message}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{request.requester}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{request.time}</span>
                              </span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {request.votes}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="pending" className="space-y-4 mt-6">
                    {recentRequests
                      .filter((r) => r.status === "pending")
                      .map((request) => (
                        <div
                          key={request.id}
                          className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 border border-border/40"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{request.requester.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-sm">{request.song}</h4>
                                <p className="text-sm text-muted-foreground">{request.artist}</p>
                              </div>
                              <Badge variant="outline">Wartend</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{request.message}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {request.requester} • {request.time}
                              </span>
                              <Button variant="ghost" size="sm" className="h-8">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {request.votes}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </TabsContent>

                  <TabsContent value="playing" className="space-y-4 mt-6">
                    {recentRequests
                      .filter((r) => r.status === "playing")
                      .map((request) => (
                        <div
                          key={request.id}
                          className="flex items-start space-x-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{request.requester.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-sm">{request.song}</h4>
                                <p className="text-sm text-muted-foreground">{request.artist}</p>
                              </div>
                              <Badge className="bg-green-500 text-white">
                                <Play className="h-3 w-3 mr-1" />
                                Läuft
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{request.message}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {request.requester} • {request.time}
                              </span>
                              <Button variant="ghost" size="sm" className="h-8">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {request.votes}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </TabsContent>

                  <TabsContent value="played" className="space-y-4 mt-6">
                    {recentRequests
                      .filter((r) => r.status === "played")
                      .map((request) => (
                        <div
                          key={request.id}
                          className="flex items-start space-x-4 p-4 rounded-lg bg-muted/20 border border-border/20 opacity-75"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{request.requester.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-sm">{request.song}</h4>
                                <p className="text-sm text-muted-foreground">{request.artist}</p>
                              </div>
                              <Badge variant="secondary">Gespielt</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{request.message}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {request.requester} • {request.time}
                              </span>
                              <Button variant="ghost" size="sm" className="h-8">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {request.votes}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Requests */}
            <Card className="bg-card/50 backdrop-blur border-chart-1/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-chart-1" />
                  <span>Top Requests</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topRequests.map((request, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-chart-1/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-chart-1">#{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{request.song}</p>
                      <p className="text-xs text-muted-foreground truncate">{request.artist}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{request.requests}x</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Request Guidelines */}
            <Card className="bg-card/50 backdrop-blur border-chart-2/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-chart-2" />
                  <span>Request Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-chart-2 mt-2 flex-shrink-0" />
                  <p>Requests werden nach Votes und Aktualität sortiert</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-chart-2 mt-2 flex-shrink-0" />
                  <p>Maximal 3 Requests pro Stunde pro User</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-chart-2 mt-2 flex-shrink-0" />
                  <p>Keine expliziten oder hasserfüllten Inhalte</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-chart-2 mt-2 flex-shrink-0" />
                  <p>DJs entscheiden final über die Playlist</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-card/50 backdrop-blur border-chart-3/20">
              <CardHeader>
                <CardTitle className="text-center">Heute</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-3">127</div>
                  <div className="text-sm text-muted-foreground">Requests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-4">89</div>
                  <div className="text-sm text-muted-foreground">Gespielt</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-5">1,234</div>
                  <div className="text-sm text-muted-foreground">Votes</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
