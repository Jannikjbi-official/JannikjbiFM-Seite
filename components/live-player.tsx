"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react"

interface LivePlayerProps {
  streamUrl?: string
  stationName?: string
  currentSong?: string
  currentArtist?: string
  listeners?: number
}

export function LivePlayer({
  streamUrl = "https://your-azuracast-url/radio/8000/radio.mp3",
  stationName = "jannikjbiFM",
  currentSong = "Aktueller Song wird geladen...",
  currentArtist = "Künstler wird geladen...",
  listeners = 0,
}: LivePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <Card className="w-full bg-card/50 backdrop-blur border-primary/20">
      <CardContent className="p-6">
        <audio ref={audioRef} src={streamUrl} preload="none" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary pulse-glow">
              <Radio className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg gradient-text">{stationName}</h3>
              <p className="text-sm text-muted-foreground">Live Stream</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Hörer</p>
            <p className="font-semibold text-accent">{listeners.toLocaleString()}</p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-foreground mb-1">{currentSong}</h4>
          <p className="text-sm text-muted-foreground">{currentArtist}</p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            onClick={togglePlay}
            size="lg"
            className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 pulse-glow"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </Button>

          <div className="flex items-center space-x-2 flex-1">
            <Button variant="ghost" size="sm" onClick={toggleMute} className="h-8 w-8 p-0">
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>

            <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />

            <span className="text-sm text-muted-foreground w-8">{volume[0]}%</span>
          </div>
        </div>

        {/* Visual Equalizer */}
        <div className="flex items-end justify-center space-x-1 mt-6 h-8">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-primary rounded-t ${isPlaying ? "wave-animation" : "h-1"}`}
              style={{
                animationDelay: `${i * 0.1}s`,
                height: isPlaying ? `${Math.random() * 100 + 10}%` : "4px",
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
