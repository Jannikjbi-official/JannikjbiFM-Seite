import { Navigation } from "@/components/navigation"
import { LiveChat } from "@/components/live-chat"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, Shield, Volume2, Heart, Smile } from "lucide-react"

const chatRules = [
  "Sei respektvoll zu anderen Hörern und DJs",
  "Keine Spam-Nachrichten oder Werbung",
  "Halte dich an die Community-Richtlinien",
  "Song-Requests gehören in den Request-Bereich",
  "Keine persönlichen Informationen teilen",
  "Moderatoren haben das letzte Wort",
]

const chatCommands = [
  { command: "/song", description: "Zeigt den aktuellen Song an" },
  { command: "/dj", description: "Informationen über den aktuellen DJ" },
  { command: "/requests", description: "Link zum Request-Bereich" },
  { command: "/help", description: "Zeigt alle verfügbaren Befehle" },
]

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Live Chat</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Chatte live mit anderen Hörern und den DJs von jannikjbiFM
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Chat */}
          <div className="lg:col-span-3">
            <LiveChat />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat Stats */}
            <Card className="bg-card/50 backdrop-blur border-chart-1/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-chart-1" />
                  <span>Chat Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-1">247</div>
                  <div className="text-sm text-muted-foreground">Online</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-2">1,834</div>
                  <div className="text-sm text-muted-foreground">Nachrichten heute</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-3">89</div>
                  <div className="text-sm text-muted-foreground">Aktive Chatter</div>
                </div>
              </CardContent>
            </Card>

            {/* Chat Rules */}
            <Card className="bg-card/50 backdrop-blur border-chart-2/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-chart-2" />
                  <span>Chat Regeln</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {chatRules.map((rule, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-chart-2 mt-2 flex-shrink-0" />
                    <p className="text-sm">{rule}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chat Commands */}
            <Card className="bg-card/50 backdrop-blur border-chart-3/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-chart-3" />
                  <span>Chat Befehle</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {chatCommands.map((cmd, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {cmd.command}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground pl-2">{cmd.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chat Features */}
            <Card className="bg-card/50 backdrop-blur border-chart-4/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-chart-4" />
                  <span>Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-chart-4" />
                  <span>Sound-Benachrichtigungen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Smile className="h-4 w-4 text-chart-4" />
                  <span>Emoji-Unterstützung</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-chart-4" />
                  <span>User-Profile</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4 text-chart-4" />
                  <span>Private Nachrichten</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
