"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Users, MessageCircle, Heart, Smile, Settings, Volume2, VolumeX } from "lucide-react"

interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: Date
  type: "message" | "system" | "request"
  avatar?: string
  badges?: string[]
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    user: "DJ Jannik",
    message: "Willkommen im jannikjbiFM Chat! 🎵",
    timestamp: new Date(Date.now() - 300000),
    type: "system",
    badges: ["DJ", "MOD"],
  },
  {
    id: "2",
    user: "MusicLover23",
    message: "Geiler Track gerade! Was läuft da?",
    timestamp: new Date(Date.now() - 240000),
    type: "message",
  },
  {
    id: "3",
    user: "RadioFan88",
    message: "Das ist 'Blinding Lights' von The Weeknd",
    timestamp: new Date(Date.now() - 180000),
    type: "message",
  },
  {
    id: "4",
    user: "PopQueen",
    message: "Könnt ihr mal Taylor Swift spielen? 🙏",
    timestamp: new Date(Date.now() - 120000),
    type: "request",
  },
  {
    id: "5",
    user: "BeatMaster",
    message: "Beste Radiostation ever! Höre jeden Tag 💯",
    timestamp: new Date(Date.now() - 60000),
    type: "message",
  },
]

export function LiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isConnected, setIsConnected] = useState(true)
  const [userCount, setUserCount] = useState(247)
  const [isMuted, setIsMuted] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate new messages
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessages = [
        "Tolle Musik heute! 🎶",
        "Kann jemand den Song-Titel sagen?",
        "Grüße aus Hamburg!",
        "Läuft bei euch auch so gut?",
        "DJ Jannik ist der Beste! 🔥",
        "Mehr Electronic bitte!",
        "Perfekt für den Feierabend",
        "Wer ist auch schon seit Stunden hier? 😄",
      ]

      const randomUsers = [
        "MusicFan2024",
        "RadioLover",
        "BeatHunter",
        "SoundWave",
        "MelodyMaker",
        "RhythmRider",
        "TuneSeeker",
        "AudioAddict",
      ]

      if (Math.random() > 0.7) {
        // 30% chance every 5 seconds
        const newMsg: ChatMessage = {
          id: Date.now().toString(),
          user: randomUsers[Math.floor(Math.random() * randomUsers.length)],
          message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
          timestamp: new Date(),
          type: "message",
        }

        setMessages((prev) => [...prev.slice(-20), newMsg]) // Keep only last 20 messages
        setUserCount((prev) => prev + Math.floor(Math.random() * 3) - 1) // Random user count change
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: "Du",
      message: newMessage,
      timestamp: new Date(),
      type: "message",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="bg-card/50 backdrop-blur border-primary/20 h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span>Live Chat</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{userCount}</span>
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)} className="h-8 w-8 p-0">
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-xs text-muted-foreground">{isConnected ? "Verbunden" : "Verbindung unterbrochen"}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="space-y-3 pb-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={message.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">{message.user.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium truncate">{message.user}</span>
                    {message.badges?.map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs px-1 py-0 h-4">
                        {badge}
                      </Badge>
                    ))}
                    <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                  </div>
                  <p
                    className={`text-sm break-words ${
                      message.type === "system"
                        ? "text-primary font-medium"
                        : message.type === "request"
                          ? "text-accent"
                          : "text-foreground"
                    }`}
                  >
                    {message.message}
                  </p>
                </div>
                {message.type === "message" && (
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                    <Heart className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t border-border/40 p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Schreibe eine Nachricht..."
                className="pr-10"
                disabled={!isConnected}
              />
              <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleSendMessage} disabled={!newMessage.trim() || !isConnected} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Drücke Enter zum Senden</span>
            <span>{newMessage.length}/500</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
