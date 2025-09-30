"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Volume2, VolumeX, Radio, Download, Share2, Heart } from "lucide-react"
import { useAzuraCast } from "./azuracast-integration"
import { AZURACAST_CONFIG } from "@/lib/azuracast-config"

interface EnhancedLivePlayerProps {
  azuracastUrl?: string
  stationId?: string | number
  fallbackStreamUrl?: string
  stationName?: string
}

export function EnhancedLivePlayer({
  azuracastUrl = AZURACAST_CONFIG.baseUrl,
  stationId = AZURACAST_CONFIG.stationId,
  fallbackStreamUrl = AZURACAST_CONFIG.fallbackStreamUrl,
  stationName = AZURACAST_CONFIG.stationName,
}: EnhancedLivePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [volume, setVolume] = useState([AZURACAST_CONFIG.settings.defaultVolume])
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)

  // Use AzuraCast integration
  const { data: azuraData, loading, error } = useAzuraCast(azuracastUrl, stationId)

  useEffect(() => {
    console.log("[v0] Player: AzuraCast data", { azuraData, loading, error })
  }, [azuraData, loading, error])

  // Fallback data when AzuraCast is not available
  const currentSong = azuraData?.now_playing?.song?.title || "Shattered Reality"
  const currentArtist = azuraData?.now_playing?.song?.artist || "Torsonic"
  const listeners = azuraData?.listeners?.total || azuraData?.station?.listeners?.total || 1247
  const isOnline = azuraData?.station?.is_online ?? true
  const streamUrl = azuraData?.station?.mounts?.[0]?.url || azuraData?.station?.listen_url || fallbackStreamUrl
  const songProgress = azuraData?.now_playing
    ? (azuraData.now_playing.elapsed / azuraData.now_playing.duration) * 100
    : 0

  useEffect(() => {
    console.log("[v0] Player: Stream URL", streamUrl)
  }, [streamUrl])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  const togglePlay = async () => {
    if (!audioRef.current || isLoading) return

    const audio = audioRef.current

    try {
      setIsLoading(true)

      if (isPlaying) {
        // If there's a pending play promise, wait for it first
        if (playPromiseRef.current) {
          await playPromiseRef.current.catch(() => {
            // Ignore errors from the previous play attempt
          })
          playPromiseRef.current = null
        }

        audio.pause()
        setIsPlaying(false)
      } else {
        // Load the audio if not already loaded
        if (audio.readyState < 2) {
          audio.load()
        }

        // Store the play promise
        const playPromise = audio.play()
        playPromiseRef.current = playPromise

        await playPromise
        playPromiseRef.current = null
        setIsPlaying(true)
      }
    } catch (error) {
      console.error("[v0] Player: Error toggling playback:", error)
      playPromiseRef.current = null
      setIsPlaying(false)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentSong} - ${currentArtist}`,
          text: `Höre gerade "${currentSong}" von ${currentArtist} auf ${stationName}!`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <Card className="w-full bg-card/50 backdrop-blur border-primary/20 overflow-hidden">
      <CardContent className="p-0">
        <audio
          ref={audioRef}
          src={streamUrl}
          preload="none"
          onError={(e) => {
            console.error("[v0] Player: Audio error:", e)
            setIsPlaying(false)
            setIsLoading(false)
          }}
          onLoadStart={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Album Art / Visualizer Background */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 via-background to-accent/20 overflow-hidden">
          {azuraData?.now_playing?.song?.art ? (
            <img
              src={azuraData.now_playing.song.art || "/placeholder.svg"}
              alt={`${currentSong} - ${currentArtist}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-end space-x-1 h-16">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 bg-primary rounded-t ${isPlaying ? "wave-animation" : "h-2"}`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      height: isPlaying ? `${Math.random() * 100 + 20}%` : "8px",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Status Overlay */}
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <Badge variant={isOnline ? "default" : "destructive"} className="pulse-glow">
              <div className="flex h-2 w-2 rounded-full bg-current animate-pulse mr-2" />
              {isOnline ? "LIVE" : "OFFLINE"}
            </Badge>
            <Badge variant="outline" className="bg-background/80">
              {listeners.toLocaleString()} Hörer
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 bg-background/80 hover:bg-background"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 bg-background/80 hover:bg-background"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Song Info */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground mb-1 text-balance">{currentSong}</h3>
            <p className="text-lg text-muted-foreground mb-2">{currentArtist}</p>
            {azuraData?.now_playing?.song?.album && (
              <p className="text-sm text-muted-foreground">Album: {azuraData.now_playing.song.album}</p>
            )}

            {/* Song Progress */}
            {azuraData?.now_playing && (
              <div className="mt-3">
                <Progress value={songProgress} className="h-1" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>
                    {Math.floor(azuraData.now_playing.elapsed / 60)}:
                    {(azuraData.now_playing.elapsed % 60).toString().padStart(2, "0")}
                  </span>
                  <span>
                    {Math.floor(azuraData.now_playing.duration / 60)}:
                    {(azuraData.now_playing.duration % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={togglePlay}
              size="lg"
              className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 pulse-glow"
              disabled={!isOnline || isLoading}
            >
              {isLoading ? (
                <div className="h-7 w-7 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-7 w-7" />
              ) : (
                <Play className="h-7 w-7 ml-1" />
              )}
            </Button>

            <div className="flex items-center space-x-3 flex-1">
              <Button variant="ghost" size="sm" onClick={toggleMute} className="h-8 w-8 p-0">
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />

              <span className="text-sm text-muted-foreground w-10 text-right">{volume[0]}%</span>
            </div>

            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {/* Station Info */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/40">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Radio className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm gradient-text">{stationName}</p>
                <p className="text-xs text-muted-foreground">
                  {loading ? "Lade..." : error ? "Offline Modus" : "Live Stream"}
                </p>
              </div>
            </div>

            {azuraData?.playing_next && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Als nächstes:</p>
                <p className="text-sm font-medium">
                  {azuraData.playing_next.song.title} - {azuraData.playing_next.song.artist}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
