import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Radio,
  MessageSquare,
  Music,
  Settings,
  BarChart3,
  Calendar,
  Database,
  Server,
  Activity,
  Eye,
  Play,
  Pause,
  SkipForward,
  Volume2,
  Mic,
  Trash2,
  Plus,
} from "lucide-react"

const dashboardStats = [
  {
    title: "Aktuelle Hörer",
    value: "1,247",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "chart-1",
  },
  {
    title: "Song Requests",
    value: "89",
    change: "+5%",
    trend: "up",
    icon: Music,
    color: "chart-2",
  },
  {
    title: "Chat Nachrichten",
    value: "2,156",
    change: "+23%",
    trend: "up",
    icon: MessageSquare,
    color: "chart-3",
  },
  {
    title: "Uptime",
    value: "99.8%",
    change: "0%",
    trend: "stable",
    icon: Activity,
    color: "chart-4",
  },
]

const recentRequests = [
  {
    id: 1,
    song: "Blinding Lights",
    artist: "The Weeknd",
    requester: "MusicLover23",
    time: "vor 2 Min",
    status: "pending",
  },
  {
    id: 2,
    song: "As It Was",
    artist: "Harry Styles",
    requester: "PopFan2024",
    time: "vor 5 Min",
    status: "approved",
  },
  {
    id: 3,
    song: "Heat Waves",
    artist: "Glass Animals",
    requester: "IndieVibes",
    time: "vor 8 Min",
    status: "playing",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "user_join",
    message: "MusicFan23 ist dem Chat beigetreten",
    time: "vor 1 Min",
    icon: Users,
  },
  {
    id: 2,
    type: "song_request",
    message: "Neuer Song Request: 'Flowers' von Miley Cyrus",
    time: "vor 3 Min",
    icon: Music,
  },
  {
    id: 3,
    type: "dj_change",
    message: "DJ Sarah hat die Sendung übernommen",
    time: "vor 15 Min",
    icon: Mic,
  },
  {
    id: 4,
    type: "system",
    message: "Stream-Qualität auf 320kbps erhöht",
    time: "vor 1 Std",
    icon: Settings,
  },
]

const upcomingShows = [
  {
    id: 1,
    title: "Evening Mix",
    dj: "DJ Jannik",
    time: "18:00 - 20:00",
    status: "live",
  },
  {
    id: 2,
    title: "Rock Hour",
    dj: "DJ Sarah",
    time: "20:00 - 22:00",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Night Beats",
    dj: "DJ Mike",
    time: "22:00 - 00:00",
    status: "scheduled",
  },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
            <p className="text-muted-foreground">Verwalte jannikjbiFM Station</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              <Activity className="h-3 w-3 mr-1" />
              Station Online
            </Badge>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Einstellungen
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p
                      className={`text-xs ${stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : "text-muted-foreground"}`}
                    >
                      {stat.change} vs. letzte Woche
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 text-${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Übersicht</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="schedule">Programm</TabsTrigger>
            <TabsTrigger value="users">Benutzer</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stream Control */}
              <Card className="bg-card/50 backdrop-blur border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Radio className="h-5 w-5 text-accent" />
                    <span>Stream Control</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Aktueller Song</p>
                      <p className="text-sm text-muted-foreground">Blinding Lights - The Weeknd</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <SkipForward className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Pause className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>2:15</span>
                    <span>3:28</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-4 w-4" />
                      <span className="text-sm">75%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">1,247 Hörer</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-card/50 backdrop-blur border-chart-1/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-chart-1" />
                    <span>Letzte Aktivitäten</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-chart-1/20 flex items-center justify-center">
                        <activity.icon className="h-4 w-4 text-chart-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Shows */}
              <Card className="bg-card/50 backdrop-blur border-chart-2/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-chart-2" />
                    <span>Heutige Shows</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingShows.map((show) => (
                    <div key={show.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">{show.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {show.dj} • {show.time}
                        </p>
                      </div>
                      <Badge
                        variant={show.status === "live" ? "default" : "outline"}
                        className={show.status === "live" ? "bg-red-500 text-white" : ""}
                      >
                        {show.status === "live" && "LIVE"}
                        {show.status === "upcoming" && "Bald"}
                        {show.status === "scheduled" && "Geplant"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-card/50 backdrop-blur border-chart-3/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-chart-3" />
                    <span>Heute</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-chart-3">127</p>
                      <p className="text-xs text-muted-foreground">Requests</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-chart-4">2.1k</p>
                      <p className="text-xs text-muted-foreground">Chat Messages</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-chart-5">89</p>
                      <p className="text-xs text-muted-foreground">Neue Hörer</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">4.2h</p>
                      <p className="text-xs text-muted-foreground">Ø Hördauer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Music className="h-5 w-5 text-primary" />
                    <span>Song Requests verwalten</span>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Manuell hinzufügen
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/40"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{request.requester.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{request.song}</p>
                          <p className="text-sm text-muted-foreground">
                            {request.artist} • von {request.requester}
                          </p>
                          <p className="text-xs text-muted-foreground">{request.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            request.status === "playing"
                              ? "default"
                              : request.status === "approved"
                                ? "secondary"
                                : "outline"
                          }
                          className={request.status === "playing" ? "bg-green-500 text-white" : ""}
                        >
                          {request.status === "playing" && <Play className="h-3 w-3 mr-1" />}
                          {request.status === "pending" && "Wartend"}
                          {request.status === "approved" && "Genehmigt"}
                          {request.status === "playing" && "Läuft"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur border-chart-1/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-chart-1" />
                  <span>Chat Moderation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-chart-1">247</p>
                    <p className="text-sm text-muted-foreground">Aktive Chatter</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-chart-2">2,156</p>
                    <p className="text-sm text-muted-foreground">Nachrichten heute</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-chart-3">12</p>
                    <p className="text-sm text-muted-foreground">Moderierte Nachrichten</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>ML</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">MusicLover23</p>
                        <p className="text-xs text-muted-foreground">Tolle Musik heute! 🎵</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur border-chart-4/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Server className="h-5 w-5 text-chart-4" />
                    <span>Server Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">CPU Auslastung</span>
                      <span className="text-sm font-medium">23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">RAM Nutzung</span>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Festplatte</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bandbreite</span>
                      <span className="text-sm font-medium">156 Mbps</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-chart-5/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5 text-chart-5" />
                    <span>AzuraCast Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Station Status</span>
                    <Badge className="bg-green-500 text-white">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Stream Qualität</span>
                    <span className="text-sm font-medium">320 kbps</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Uptime</span>
                    <span className="text-sm font-medium">15d 7h 23m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Letzte Synchronisation</span>
                    <span className="text-sm font-medium">vor 30s</span>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    AzuraCast öffnen
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
