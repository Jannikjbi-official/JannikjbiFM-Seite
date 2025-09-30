"use client"

import type React from "react"

import { useState, useEffect } from "react"

export interface AzuraCastStation {
  id: number
  name: string
  shortcode: string
  description: string
  frontend: string
  backend: string
  listen_url: string
  url: string
  public_player_url: string
  playlist_pls_url: string
  playlist_m3u_url: string
  is_public: boolean
  mounts: Array<{
    id: number
    name: string
    url: string
    bitrate: number
    format: string
    listeners: {
      total: number
      unique: number
    }
  }>
  remotes: Array<{
    id: number
    name: string
    url: string
    mount: string
  }>
}

export interface AzuraCastSongHistory {
  sh_id: number
  played_at: number
  duration: number
  playlist: string
  streamer: string
  is_request: boolean
  song: {
    id: string
    text: string
    artist: string
    title: string
    album: string
    genre: string
    lyrics: string
    art: string
    custom_fields: Record<string, any>
  }
}

export interface AzuraCastRequest {
  request_id: string
  request_url: string
  song: {
    id: string
    text: string
    artist: string
    title: string
    album: string
    genre: string
    art: string
  }
}

export interface AzuraCastListeners {
  total: number
  unique: number
  current: Array<{
    ip: string
    user_agent: string
    connected_on: number
    connected_time: number
    location: {
      description: string
      region: string
      city: string
      country: string
    }
  }>
}

interface AzuraCastData {
  station: {
    id: number
    name: string
    shortcode: string
    description: string
    frontend: string
    backend: string
    listen_url: string
    url: string
    public_player_url: string
    playlist_pls_url: string
    playlist_m3u_url: string
    is_public: boolean
    is_online: boolean
    listeners: {
      total: number
      unique: number
    }
    mounts: Array<{
      id: number
      name: string
      url: string
      bitrate: number
      format: string
      listeners: {
        total: number
        unique: number
      }
    }>
  }
  now_playing: {
    sh_id: number
    played_at: number
    duration: number
    playlist: string
    streamer: string
    is_request: boolean
    song: {
      id: string
      text: string
      artist: string
      title: string
      album: string
      genre: string
      lyrics: string
      art: string
      custom_fields: Record<string, any>
    }
    elapsed: number
    remaining: number
  }
  playing_next: {
    cued_at: number
    played_at: number
    duration: number
    playlist: string
    is_request: boolean
    song: {
      id: string
      text: string
      artist: string
      title: string
      album: string
      genre: string
      art: string
    }
  }
  song_history: AzuraCastSongHistory[]
  live: {
    is_live: boolean
    streamer_name: string
    broadcast_start: number
  }
  cache: string
}

interface AzuraCastIntegrationProps {
  baseUrl: string
  stationId: string | number
  children: (data: AzuraCastData | null, loading: boolean, error: string | null) => React.ReactNode
}

export function AzuraCastIntegration({ baseUrl, stationId, children }: AzuraCastIntegrationProps) {
  const [data, setData] = useState<AzuraCastData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // AzuraCast API endpoint for station status
        const response = await fetch(`${baseUrl}/api/nowplaying/${stationId}`, {
          headers: {
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const azuraData = await response.json()
        setData(azuraData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data")
        console.error("AzuraCast API Error:", err)
      } finally {
        setLoading(false)
      }
    }

    // Initial fetch
    fetchData()

    // Set up polling every 10 seconds
    const interval = setInterval(fetchData, 10000)

    return () => clearInterval(interval)
  }, [baseUrl, stationId])

  return <>{children(data, loading, error)}</>
}

// Hook for easier usage
export function useAzuraCast(baseUrl: string, stationId: string | number) {
  const [data, setData] = useState<AzuraCastData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("[v0] AzuraCast: Fetching data from", `${baseUrl}/api/nowplaying/${stationId}`)
        setLoading(true)
        setError(null)

        const response = await fetch(`${baseUrl}/api/nowplaying/${stationId}`, {
          mode: "cors",
          credentials: "omit",
          headers: {
            Accept: "application/json",
          },
        })

        console.log("[v0] AzuraCast: Response status", response.status)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const azuraData = await response.json()
        console.log("[v0] AzuraCast: Data received", azuraData)
        setData(azuraData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch data"
        console.error("[v0] AzuraCast API Error:", err)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)

    return () => clearInterval(interval)
  }, [baseUrl, stationId])

  return { data, loading, error }
}

export class AzuraCastAPI {
  private baseUrl: string
  private stationId: string | number
  private apiKey?: string

  constructor(baseUrl: string, stationId: string | number, apiKey?: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "") // Remove trailing slash
    this.stationId = stationId
    this.apiKey = apiKey
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    }

    if (this.apiKey) {
      headers["X-API-Key"] = this.apiKey
    }

    const response = await fetch(`${this.baseUrl}/api${endpoint}`, {
      headers,
      method: "GET",
    })

    if (!response.ok) {
      throw new Error(`AzuraCast API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Get current station status and now playing info
  async getNowPlaying(): Promise<AzuraCastData> {
    return this.makeRequest<AzuraCastData>(`/nowplaying/${this.stationId}`)
  }

  // Get station information
  async getStation(): Promise<AzuraCastStation> {
    return this.makeRequest<AzuraCastStation>(`/station/${this.stationId}`)
  }

  // Get song history
  async getSongHistory(start?: Date, end?: Date): Promise<AzuraCastSongHistory[]> {
    let endpoint = `/station/${this.stationId}/history`
    const params = new URLSearchParams()

    if (start) params.append("start", Math.floor(start.getTime() / 1000).toString())
    if (end) params.append("end", Math.floor(end.getTime() / 1000).toString())

    if (params.toString()) {
      endpoint += `?${params.toString()}`
    }

    return this.makeRequest<AzuraCastSongHistory[]>(endpoint)
  }

  // Get current listeners
  async getListeners(): Promise<AzuraCastListeners> {
    return this.makeRequest<AzuraCastListeners>(`/station/${this.stationId}/listeners`)
  }

  // Get requestable songs
  async getRequestable(): Promise<AzuraCastRequest[]> {
    return this.makeRequest<AzuraCastRequest[]>(`/station/${this.stationId}/requests`)
  }

  // Submit a song request
  async submitRequest(songId: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${this.baseUrl}/api/station/${this.stationId}/request/${songId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(this.apiKey && { "X-API-Key": this.apiKey }),
      },
    })

    return response.json()
  }
}

export function useAzuraCastAPI(baseUrl: string, stationId: string | number, apiKey?: string) {
  const [api] = useState(() => new AzuraCastAPI(baseUrl, stationId, apiKey))
  const [nowPlaying, setNowPlaying] = useState<AzuraCastData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        console.log("[v0] AzuraCastAPI: Fetching now playing")
        setLoading(true)
        setError(null)
        const data = await api.getNowPlaying()
        console.log("[v0] AzuraCastAPI: Data received", data)
        setNowPlaying(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch data"
        console.error("[v0] AzuraCastAPI Error:", err)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 10000)

    return () => clearInterval(interval)
  }, [api])

  return {
    api,
    nowPlaying,
    loading,
    error,
    // Convenience methods
    submitRequest: (songId: string) => api.submitRequest(songId),
    getSongHistory: (start?: Date, end?: Date) => api.getSongHistory(start, end),
    getListeners: () => api.getListeners(),
    getRequestable: () => api.getRequestable(),
  }
}
