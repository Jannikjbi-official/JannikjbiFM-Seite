import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Users, Bell, Download, Filter } from "lucide-react"

const schedule = {
  today: [
    {
      time: "18:00 - 20:00",
      show: "Evening Mix",
      dj: "DJ Jannik",
      avatar: "/dj-jannik.jpg",
      description: "Die besten Hits für den perfekten Feierabend",
      genres: ["Pop", "Electronic", "Indie"],
      isLive: true,
      listeners: 1247,
    },
    {
      time: "20:00 - 22:00",
      show: "Rock Hour",
      dj: "DJ Sarah",
      avatar: "/dj-sarah.jpg",
      description: "Rock, Alternative und Underground Sounds",
      genres: ["Rock", "Alternative", "Punk"],
      isLive: false,
      listeners: 0,
    },
    {
      time: "22:00 - 00:00",
      show: "Night Beats",
      dj: "DJ Mike",
      avatar: "/dj-mike.jpg",
      description: "Hip-Hop, R&B und die freshesten Beats",
      genres: ["Hip-Hop", "R&B", "Trap"],
      isLive: false,
      listeners: 0,
    },
    {
      time: "00:00 - 06:00",
      show: "Late Night Mix",
      dj: "DJ Alex",
      avatar: "/dj-alex.jpg",
      description: "Techno und Deep House für die Nacht",
      genres: ["Techno", "Deep House", "Progressive"],
      isLive: false,
      listeners: 0,
    },
  ],
  week: [
    {
      day: "Montag",
      shows: [
        { time: "06:00", show: "Morning Energy", dj: "DJ Sarah", duration: "4h" },
        { time: "10:00", show: "Workday Vibes", dj: "DJ Mike", duration: "4h" },
        { time: "14:00", show: "Afternoon Mix", dj: "DJ Alex", duration: "4h" },
        { time: "18:00", show: "Evening Mix", dj: "DJ Jannik", duration: "2h" },
        { time: "20:00", show: "Rock Hour", dj: "DJ Sarah", duration: "2h" },
        { time: "22:00", show: "Night Beats", dj: "DJ Mike", duration: "2h" },
        { time: "00:00", show: "Late Night", dj: "DJ Alex", duration: "6h" },
      ],
    },
    {
      day: "Dienstag",
      shows: [
        { time: "06:00", show: "Morning Energy", dj: "DJ Mike", duration: "4h" },
        { time: "10:00", show: "Workday Vibes", dj: "DJ Alex", duration: "4h" },
        { time: "14:00", show: "Afternoon Mix", dj: "DJ Jannik", duration: "4h" },
        { time: "18:00", show: "Evening Mix", dj: "DJ Sarah", duration: "2h" },
        { time: "20:00", show: "Electronic Hour", dj: "DJ Alex", duration: "2h" },
        { time: "22:00", show: "Hip-Hop Night", dj: "DJ Mike", duration: "2h" },
        { time: "00:00", show: "Late Night", dj: "DJ Jannik", duration: "6h" },
      ],
    },
    // Add more days...
  ],
}

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 gradient-text">Sendeprogramm</h1>
            <p className="text-lg text-muted-foreground">
              Verpasse keine deiner Lieblings-Shows - hier findest du unser komplettes Programm
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Benachrichtigungen
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Kalender Export
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="today">Heute</TabsTrigger>
            <TabsTrigger value="week">Diese Woche</TabsTrigger>
            <TabsTrigger value="calendar">Kalender</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {schedule.today.map((show, index) => (
                <Card
                  key={index}
                  className={`bg-card/50 backdrop-blur transition-all duration-300 ${
                    show.isLive ? "border-red-500/40 pulse-glow" : "border-primary/20 hover:border-primary/40"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={show.avatar || "/placeholder.svg"} alt={show.dj} />
                            <AvatarFallback>
                              {show.dj
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {show.isLive && (
                            <div className="absolute -top-1 -right-1">
                              <Badge className="bg-red-500 text-white text-xs">LIVE</Badge>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold">{show.show}</h3>
                            {show.isLive && (
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">ON AIR</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{show.dj}</p>
                          <p className="text-sm text-foreground mb-3">{show.description}</p>

                          <div className="flex flex-wrap gap-1">
                            {show.genres.map((genre) => (
                              <Badge key={genre} variant="outline" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <div className="flex items-center space-x-2 text-lg font-semibold">
                          <Clock className="h-5 w-5 text-primary" />
                          <span>{show.time}</span>
                        </div>

                        {show.isLive && (
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{show.listeners.toLocaleString()} Hörer</span>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          {show.isLive ? (
                            <Button size="sm" className="pulse-glow">
                              Jetzt hören
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Bell className="h-4 w-4 mr-2" />
                              Erinnern
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="week" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {schedule.week.map((day, dayIndex) => (
                <Card key={dayIndex} className="bg-card/50 backdrop-blur border-chart-2/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-chart-2" />
                      <span>{day.day}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {day.shows.map((show, showIndex) => (
                        <div
                          key={showIndex}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div>
                            <div className="font-medium text-sm">{show.show}</div>
                            <div className="text-xs text-muted-foreground">{show.dj}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-chart-2">{show.time}</div>
                            <div className="text-xs text-muted-foreground">{show.duration}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle>Kalender Ansicht</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
                    <div key={day} className="text-center font-semibold text-sm p-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 6 + new Date().getDate()
                    const isToday = day === new Date().getDate()
                    const hasShow = Math.random() > 0.3

                    return (
                      <div
                        key={i}
                        className={`aspect-square p-2 rounded-lg border text-center text-sm ${
                          isToday
                            ? "bg-primary text-primary-foreground border-primary"
                            : hasShow
                              ? "bg-muted/50 border-border hover:bg-muted"
                              : "bg-background border-border/50"
                        }`}
                      >
                        <div className="font-semibold">{day > 0 && day <= 31 ? day : ""}</div>
                        {hasShow && day > 0 && day <= 31 && (
                          <div className="w-1 h-1 bg-accent rounded-full mx-auto mt-1" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
