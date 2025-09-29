import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, Music, Heart, MessageCircle, Instagram, Twitter, Globe } from "lucide-react"

const djs = [
  {
    id: "jannik",
    name: "DJ Jannik",
    realName: "Jannik Schmidt",
    avatar: "/dj-jannik.jpg",
    bio: "Gründer von jannikjbiFM und leidenschaftlicher Musikliebhaber. Spezialisiert auf Electronic, Pop und die neuesten Hits.",
    genres: ["Electronic", "Pop", "House", "Indie"],
    shows: ["Evening Mix", "Weekend Vibes"],
    followers: 2847,
    isLive: true,
    nextShow: "Heute 18:00",
    social: {
      instagram: "@djjannik",
      twitter: "@djjannik_fm",
      website: "djjannik.com",
    },
    experience: "5 Jahre",
    favoriteArtists: ["Daft Punk", "Calvin Harris", "The Weeknd"],
  },
  {
    id: "sarah",
    name: "DJ Sarah",
    realName: "Sarah Müller",
    avatar: "/dj-sarah.jpg",
    bio: "Rock und Alternative Expertin mit einer Leidenschaft für Underground-Musik und neue Talente.",
    genres: ["Rock", "Alternative", "Punk", "Grunge"],
    shows: ["Rock Hour", "Underground Sounds"],
    followers: 1923,
    isLive: false,
    nextShow: "Heute 20:00",
    social: {
      instagram: "@sarahrocksout",
      twitter: "@djsarah_rock",
    },
    experience: "7 Jahre",
    favoriteArtists: ["Foo Fighters", "Arctic Monkeys", "Queens of the Stone Age"],
  },
  {
    id: "mike",
    name: "DJ Mike",
    realName: "Michael Weber",
    avatar: "/dj-mike.jpg",
    bio: "Hip-Hop Head und Beat-Produzent. Bringt die freshesten Tracks und die besten Oldschool Classics.",
    genres: ["Hip-Hop", "Rap", "R&B", "Trap"],
    shows: ["Night Beats", "Hip-Hop Classics"],
    followers: 3156,
    isLive: false,
    nextShow: "Heute 22:00",
    social: {
      instagram: "@djmike_beats",
      twitter: "@mikeonthebeats",
      website: "mikebeats.de",
    },
    experience: "8 Jahre",
    favoriteArtists: ["Kendrick Lamar", "J. Cole", "OutKast"],
  },
  {
    id: "alex",
    name: "DJ Alex",
    realName: "Alexandra Klein",
    avatar: "/dj-alex.jpg",
    bio: "Techno und Deep House Spezialistin. Sorgt für die perfekte Atmosphäre in den späten Stunden.",
    genres: ["Techno", "Deep House", "Progressive", "Minimal"],
    shows: ["Late Night Mix", "Techno Underground"],
    followers: 2134,
    isLive: false,
    nextShow: "Morgen 00:00",
    social: {
      instagram: "@djalextech",
      twitter: "@alexdeephouse",
    },
    experience: "6 Jahre",
    favoriteArtists: ["Charlotte de Witte", "Amelie Lens", "Tale of Us"],
  },
]

export default function DJsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Unsere DJs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Lerne die Stimmen hinter jannikjbiFM kennen - unsere talentierten DJs bringen dir 24/7 die beste Musik
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">Alle DJs</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="popular">Beliebt</TabsTrigger>
            <TabsTrigger value="schedule">Programm</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {djs.map((dj) => (
                <Card
                  key={dj.id}
                  className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={dj.avatar || "/placeholder.svg"} alt={dj.name} />
                          <AvatarFallback>
                            {dj.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {dj.isLive && (
                          <div className="absolute -top-1 -right-1">
                            <Badge className="bg-red-500 text-white pulse-glow">LIVE</Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold">{dj.name}</h3>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{dj.followers.toLocaleString()}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{dj.realName}</p>
                        <p className="text-sm text-foreground mb-3">{dj.bio}</p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {dj.genres.map((genre) => (
                            <Badge key={genre} variant="outline" className="text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{dj.nextShow}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Music className="h-4 w-4" />
                            <span>{dj.experience}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Shows:</h4>
                        <div className="flex flex-wrap gap-2">
                          {dj.shows.map((show) => (
                            <Badge key={show} className="bg-primary/20 text-primary border-primary/30">
                              {show}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Lieblingskünstler:</h4>
                        <p className="text-sm text-muted-foreground">{dj.favoriteArtists.join(", ")}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border/40">
                        <div className="flex items-center space-x-2">
                          {dj.social.instagram && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Instagram className="h-4 w-4" />
                            </Button>
                          )}
                          {dj.social.twitter && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Twitter className="h-4 w-4" />
                            </Button>
                          )}
                          {dj.social.website && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Globe className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Heart className="h-4 w-4 mr-2" />
                            Folgen
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {djs
                .filter((dj) => dj.isLive)
                .map((dj) => (
                  <Card key={dj.id} className="bg-card/50 backdrop-blur border-red-500/40 pulse-glow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={dj.avatar || "/placeholder.svg"} alt={dj.name} />
                          <AvatarFallback>
                            {dj.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-bold">{dj.name}</h3>
                          <Badge className="bg-red-500 text-white">LIVE ON AIR</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{dj.bio}</p>
                      <Button className="w-full">Jetzt anhören</Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {djs
                .sort((a, b) => b.followers - a.followers)
                .map((dj, index) => (
                  <Card key={dj.id} className="bg-card/50 backdrop-blur border-accent/20">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={dj.avatar || "/placeholder.svg"} alt={dj.name} />
                            <AvatarFallback>
                              {dj.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <Badge className="absolute -top-2 -left-2 bg-accent text-accent-foreground">
                            #{index + 1}
                          </Badge>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{dj.name}</h3>
                          <div className="flex items-center space-x-1 text-accent">
                            <Users className="h-4 w-4" />
                            <span className="font-semibold">{dj.followers.toLocaleString()} Follower</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"].map(
                (day, dayIndex) => (
                  <Card key={day} className="bg-card/50 backdrop-blur border-chart-2/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-center text-sm">{day}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {[
                        { time: "06:00", show: "Morning Mix", dj: "DJ Alex" },
                        { time: "10:00", show: "Workday Beats", dj: "DJ Sarah" },
                        { time: "14:00", show: "Afternoon Vibes", dj: "DJ Mike" },
                        { time: "18:00", show: "Evening Mix", dj: "DJ Jannik" },
                        { time: "22:00", show: "Night Session", dj: "DJ Alex" },
                      ].map((slot, index) => (
                        <div key={index} className="text-xs p-2 rounded bg-muted/30">
                          <div className="font-semibold text-chart-2">{slot.time}</div>
                          <div className="font-medium">{slot.show}</div>
                          <div className="text-muted-foreground">{slot.dj}</div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
