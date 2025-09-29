import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Eye, MessageCircle, Share2, TrendingUp, Radio, Star } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    title: "jannikjbiFM feiert 2-jähriges Jubiläum mit Special Event",
    excerpt: "Zwei Jahre jannikjbiFM! Wir feiern mit einem 24-Stunden-Marathon und exklusiven DJ-Sets.",
    content:
      "Es ist kaum zu glauben, aber jannikjbiFM wird bereits 2 Jahre alt! Was als kleines Projekt begann, ist heute eine der beliebtesten Online-Radiostationen geworden...",
    author: "DJ Jannik",
    authorAvatar: "/dj-jannik.jpg",
    publishedAt: new Date("2024-01-15"),
    category: "Station News",
    tags: ["Jubiläum", "Event", "Celebration"],
    views: 1247,
    comments: 23,
    featured: true,
    image: "/news-anniversary.jpg",
  },
  {
    id: 2,
    title: "Neue DJ Sarah verstärkt unser Team",
    excerpt:
      "Wir freuen uns, DJ Sarah als neues Mitglied unseres Teams begrüßen zu dürfen. Sie bringt frischen Wind in unsere Rock-Shows.",
    content:
      "Mit großer Freude können wir verkünden, dass DJ Sarah ab sofort Teil des jannikjbiFM-Teams ist. Mit ihrer Leidenschaft für Rock und Alternative...",
    author: "Team jannikjbiFM",
    authorAvatar: "/team-avatar.jpg",
    publishedAt: new Date("2024-01-12"),
    category: "Team",
    tags: ["Neues Mitglied", "DJ", "Rock"],
    views: 892,
    comments: 15,
    featured: false,
    image: "/dj-sarah.jpg",
  },
  {
    id: 3,
    title: "Die Top 10 Tracks der Woche",
    excerpt:
      "Unsere meistgespielten und beliebtesten Songs der vergangenen Woche - von Electronic bis Pop ist alles dabei.",
    content:
      "Jede Woche analysieren wir, welche Songs bei unseren Hörern am besten ankommen. Diese Woche dominieren Electronic und Pop die Charts...",
    author: "DJ Mike",
    authorAvatar: "/dj-mike.jpg",
    publishedAt: new Date("2024-01-10"),
    category: "Music Charts",
    tags: ["Charts", "Top 10", "Weekly"],
    views: 2156,
    comments: 34,
    featured: true,
    image: "/music-charts.jpg",
  },
  {
    id: 4,
    title: "Neue Chat-Features sind live!",
    excerpt: "Unser Live-Chat wurde mit neuen Features ausgestattet: Emojis, Befehle und bessere Moderation.",
    content:
      "Wir haben hart daran gearbeitet, euer Chat-Erlebnis zu verbessern. Ab sofort stehen euch neue Emojis, praktische Chat-Befehle und eine verbesserte Moderation zur Verfügung...",
    author: "Tech Team",
    authorAvatar: "/tech-avatar.jpg",
    publishedAt: new Date("2024-01-08"),
    category: "Updates",
    tags: ["Chat", "Features", "Update"],
    views: 743,
    comments: 12,
    featured: false,
    image: "/chat-update.jpg",
  },
  {
    id: 5,
    title: "Interview: Die Zukunft der Online-Radios",
    excerpt: "Ein spannendes Gespräch über die Entwicklung von Online-Radios und was die Zukunft bringen könnte.",
    content:
      "In einem exklusiven Interview sprechen wir über die rasante Entwicklung von Online-Radios in den letzten Jahren und werfen einen Blick in die Zukunft...",
    author: "DJ Alex",
    authorAvatar: "/dj-alex.jpg",
    publishedAt: new Date("2024-01-05"),
    category: "Interviews",
    tags: ["Interview", "Zukunft", "Online Radio"],
    views: 1534,
    comments: 28,
    featured: false,
    image: "/interview-future.jpg",
  },
  {
    id: 6,
    title: "Song Request System 2.0 ist da",
    excerpt: "Unser überarbeitetes Request-System macht es noch einfacher, eure Lieblingssongs zu wünschen.",
    content:
      "Nach monatelanger Entwicklung ist unser neues Song Request System endlich live. Mit verbessertem Voting, besserer Übersicht und neuen Features...",
    author: "Development Team",
    authorAvatar: "/dev-avatar.jpg",
    publishedAt: new Date("2024-01-03"),
    category: "Updates",
    tags: ["Requests", "System", "Update"],
    views: 967,
    comments: 19,
    featured: false,
    image: "/request-system.jpg",
  },
]

const categories = ["Alle", "Station News", "Music Charts", "Team", "Updates", "Interviews"]

const trendingTopics = [
  { topic: "Jubiläum", count: 15 },
  { topic: "Neue DJs", count: 12 },
  { topic: "Charts", count: 8 },
  { topic: "Updates", count: 6 },
  { topic: "Events", count: 4 },
]

export default function NewsPage() {
  const featuredArticles = newsArticles.filter((article) => article.featured)
  const recentArticles = newsArticles.filter((article) => !article.featured)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`
    }
    return views.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">News & Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Bleib auf dem Laufenden mit den neuesten News von jannikjbiFM
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Articles */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                <Star className="h-6 w-6 text-primary" />
                <span>Featured Stories</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="bg-card/50 backdrop-blur border-primary/20 overflow-hidden group hover:border-primary/40 transition-all duration-300"
                  >
                    <div className="aspect-video bg-muted/30 relative overflow-hidden">
                      <img
                        src={
                          article.image ||
                          `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(article.title)}`
                        }
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        {article.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={article.authorAvatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {article.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(article.publishedAt)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{formatViews(article.views)}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm">
                          Weiterlesen
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recent Articles */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Aktuelle Artikel</h2>
              <Tabs defaultValue="Alle" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="text-xs">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="Alle" className="space-y-6 mt-6">
                  {recentArticles.map((article) => (
                    <Card
                      key={article.id}
                      className="bg-card/50 backdrop-blur border-accent/20 overflow-hidden group hover:border-accent/40 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 aspect-video md:aspect-square bg-muted/30 relative overflow-hidden">
                          <img
                            src={
                              article.image ||
                              `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(article.title)}`
                            }
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                            {article.category}
                          </Badge>
                        </div>
                        <div className="md:w-2/3 flex flex-col">
                          <CardHeader>
                            <CardTitle className="line-clamp-2 group-hover:text-accent transition-colors">
                              {article.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                          </CardHeader>
                          <CardContent className="flex-1 flex flex-col justify-between">
                            <div className="flex flex-wrap gap-1 mb-4">
                              {article.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={article.authorAvatar || "/placeholder.svg"} />
                                  <AvatarFallback className="text-xs">
                                    {article.author
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-muted-foreground">{article.author}</span>
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <span className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatDate(article.publishedAt)}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{formatViews(article.views)}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <MessageCircle className="h-3 w-3" />
                                  <span>{article.comments}</span>
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <Button variant="ghost" size="sm">
                                Weiterlesen
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>

                {categories.slice(1).map((category) => (
                  <TabsContent key={category} value={category} className="space-y-6 mt-6">
                    {newsArticles
                      .filter((article) => article.category === category)
                      .map((article) => (
                        <Card key={article.id} className="bg-card/50 backdrop-blur border-chart-1/20">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 aspect-video md:aspect-square bg-muted/30 relative overflow-hidden">
                              <img
                                src={
                                  article.image ||
                                  `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(article.title)}`
                                }
                                alt={article.title}
                                className="w-full h-full object-cover"
                              />
                              <Badge className="absolute top-3 left-3 bg-chart-1 text-chart-1-foreground">
                                {article.category}
                              </Badge>
                            </div>
                            <div className="md:w-2/3 flex flex-col">
                              <CardHeader>
                                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                                <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                              </CardHeader>
                              <CardContent>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={article.authorAvatar || "/placeholder.svg"} />
                                      <AvatarFallback className="text-xs">
                                        {article.author
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm text-muted-foreground">{article.author}</span>
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    Weiterlesen
                                  </Button>
                                </div>
                              </CardContent>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </TabsContent>
                ))}
              </Tabs>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="bg-card/50 backdrop-blur border-chart-2/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-chart-2" />
                  <span>Trending Topics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={topic.topic} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-chart-2/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-chart-2">#{index + 1}</span>
                      </div>
                      <span className="text-sm font-medium">{topic.topic}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {topic.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-card/50 backdrop-blur border-chart-3/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Radio className="h-5 w-5 text-chart-3" />
                  <span>Newsletter</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Verpasse keine News mehr! Abonniere unseren Newsletter für die neuesten Updates.
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Deine E-Mail Adresse"
                    className="w-full px-3 py-2 text-sm border border-border/40 rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-chart-3/50"
                  />
                  <Button className="w-full" size="sm">
                    Abonnieren
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-card/50 backdrop-blur border-chart-4/20">
              <CardHeader>
                <CardTitle className="text-center">Blog Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-4">47</div>
                  <div className="text-sm text-muted-foreground">Artikel</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-5">12.4k</div>
                  <div className="text-sm text-muted-foreground">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-1">234</div>
                  <div className="text-sm text-muted-foreground">Kommentare</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Comments */}
            <Card className="bg-card/50 backdrop-blur border-chart-5/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-chart-5" />
                  <span>Neueste Kommentare</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { user: "MusicFan23", comment: "Toller Artikel über die Charts!", time: "vor 2h" },
                  { user: "RadioLover", comment: "Freue mich auf das Jubiläum!", time: "vor 4h" },
                  { user: "BeatHunter", comment: "DJ Sarah ist super!", time: "vor 6h" },
                ].map((comment, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{comment.user}</span>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
