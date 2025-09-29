"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Radio, Clock, TrendingUp, Globe, Headphones } from "lucide-react"
import { useAzuraCastAPI, type AzuraCastListeners, type AzuraCastSongHistory } from "./azuracast-integration"
import { AZURACAST_CONFIG } from "@/lib/azuracast-config"

interface AzuraCastStatsProps {
  baseUrl?: string
  stationId?: string | number
  apiKey?: string
}

export function AzuraCastStats({
  baseUrl = AZURACAST_CONFIG.baseUrl,
  stationId = AZURACAST_CONFIG.stationId,
  apiKey = AZURACAST_CONFIG.apiKey,
}: AzuraCastStatsProps) {
  const { nowPlaying, loading, error } = useAzuraCastAPI(baseUrl, stationId, apiKey)
  const [listeners, setListeners] = useState<AzuraCastListeners | null>(null)
  const [songHistory, setSongHistory] = useState<AzuraCastSongHistory[]>([])
  const [peakListeners, setPeakListeners] = useState(0)

  useEffect(() => {
    if (nowPlaying?.station?.listeners?.total) {
      setPeakListeners((prev) => Math.max(prev, nowPlaying.station.listeners.total))
    }
  }, [nowPlaying?.station?.listeners?.total])

  const currentListeners = nowPlaying?.station?.listeners?.total || 0
  const uniqueListeners = nowPlaying?.station?.listeners?.unique || 0
  const isOnline = nowPlaying?.station?.is_online ?? false
  const isLive = nowPlaying?.live?.is_live ?? false
  const streamerName = nowPlaying?.live?.streamer_name

  // Calculate listening time distribution
  const getListeningStats = () => {
    if (!listeners?.current) return null

    const now = Date.now() / 1000
    const timeRanges = {
      "< 5 min": 0,
      "5-30 min": 0,
      "30-60 min": 0,
      "> 1 hour": 0,
    }

    listeners.current.forEach((listener) => {
      const listeningTime = now - listener.connected_on
      if (listeningTime < 300) timeRanges["< 5 min"]++
      else if (listeningTime < 1800) timeRanges["5-30 min"]++
      else if (listeningTime < 3600) timeRanges["30-60 min"]++
      else timeRanges["> 1 hour"]++
    })

    return timeRanges
  }

  const listeningStats = getListeningStats()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-card/50 backdrop-blur border-primary/20">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="bg-card/50 backdrop-blur border-destructive/20">
        <CardContent className="p-6 text-center">
          <Radio className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Statistiken nicht verfügbar</p>
          <p className="text-xs text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Listeners */}
        <Card className="bg-card/50 backdrop-blur border-chart-1/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Aktuelle Hörer</p>
                <p className="text-2xl font-bold text-chart-1">{currentListeners.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-chart-1" />
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Peak: {peakListeners}</span>
                <span>Unique: {uniqueListeners}</span>
              </div>
              <Progress value={(currentListeners / Math.max(peakListeners, 1)) * 100} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>

        {/* Station Status */}
        <Card className="bg-card/50 backdrop-blur border-chart-2/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Station Status</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant={isOnline ? "default" : "destructive"} className="text-xs">
                    {isOnline ? "ONLINE" : "OFFLINE"}
                  </Badge>
                  {isLive && (
                    <Badge variant="secondary" className="text-xs bg-red-500 text-white">
                      LIVE
                    </Badge>
                  )}
                </div>
              </div>
              <Radio className="h-8 w-8 text-chart-2" />
            </div>
            {isLive && streamerName && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">Live DJ:</p>
                <p className="text-sm font-medium">{streamerName}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Song Progress */}
        <Card className="bg-card/50 backdrop-blur border-chart-3/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Song Progress</p>
                <p className="text-2xl font-bold text-chart-3">
                  {nowPlaying?.now_playing
                    ? `${Math.floor((nowPlaying.now_playing.elapsed / nowPlaying.now_playing.duration) * 100)}%`
                    : "0%"}
                </p>
              </div>
              <Clock className="h-8 w-8 text-chart-3" />
            </div>
            {nowPlaying?.now_playing && (
              <div className="mt-4">
                <Progress
                  value={(nowPlaying.now_playing.elapsed / nowPlaying.now_playing.duration) * 100}
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>
                    {Math.floor(nowPlaying.now_playing.elapsed / 60)}:
                    {(nowPlaying.now_playing.elapsed % 60).toString().padStart(2, "0")}
                  </span>
                  <span>
                    {Math.floor(nowPlaying.now_playing.duration / 60)}:
                    {(nowPlaying.now_playing.duration % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bitrate/Quality */}
        <Card className="bg-card/50 backdrop-blur border-chart-4/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stream Quality</p>
                <p className="text-2xl font-bold text-chart-4">
                  {nowPlaying?.station?.mounts?.[0]?.bitrate || 128} kbps
                </p>
              </div>
              <Headphones className="h-8 w-8 text-chart-4" />
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground">
                Format: {nowPlaying?.station?.mounts?.[0]?.format || "MP3"}
              </p>
              <Badge variant="outline" className="text-xs mt-1">
                {nowPlaying?.station?.frontend || "Icecast"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Song History */}
        <Card className="bg-card/50 backdrop-blur border-chart-5/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-chart-5" />
              <span>Zuletzt gespielt</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {nowPlaying?.song_history?.slice(0, 5).map((song, index) => (
              <div key={song.sh_id} className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-chart-5/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-chart-5">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{song.song.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{song.song.artist}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(song.played_at * 1000).toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            )) || <p className="text-sm text-muted-foreground text-center py-4">Keine Song-Historie verfügbar</p>}
          </CardContent>
        </Card>

        {/* Listening Duration Stats */}
        {listeningStats && (
          <Card className="bg-card/50 backdrop-blur border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-accent" />
                <span>Hördauer Verteilung</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(listeningStats).map(([range, count]) => (
                <div key={range} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{range}</span>
                    <span className="text-sm text-muted-foreground">{count} Hörer</span>
                  </div>
                  <Progress value={(count / Math.max(listeners?.current?.length || 1, 1)) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
