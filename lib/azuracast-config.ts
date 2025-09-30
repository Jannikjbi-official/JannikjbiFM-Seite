// AzuraCast Konfiguration für jannikjbiFM

export const AZURACAST_CONFIG = {
  // Deine AzuraCast Server URL
  baseUrl: "https://admin.jannikjbi.de",

  // Deine Station ID
  stationId: "jannikjbifm",

  // API Key für erweiterte Funktionen
  apiKey: "cd56afcd0eb2c77a:8c34b2fa738b7dd7b2833cd8012521b0",

  fallbackStreamUrl: "https://admin.jannikjbi.de/listen/jannikjbifm/radio.mp3",

  // Station Name
  stationName: "jannikjbifm",

  // Weitere Einstellungen
  settings: {
    // Aktualisierungsintervall in Millisekunden (10 Sekunden)
    updateInterval: 10000,

    // Automatisches Abspielen beim Laden der Seite
    autoplay: false,

    // Standard Lautstärke (0-100)
    defaultVolume: 75,

    // Song Requests aktivieren
    enableRequests: true,

    // Chat aktivieren
    enableChat: true,
  },
}

export function getStreamUrl(mount = "radio.mp3") {
  return `${AZURACAST_CONFIG.baseUrl}/listen/${AZURACAST_CONFIG.stationId}/${mount}`
}

export function getApiUrl(endpoint: string) {
  // Ensure endpoint starts with /
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  return `${AZURACAST_CONFIG.baseUrl}/api${cleanEndpoint}`
}

export function getPublicUrl(path = "") {
  // Ensure path starts with / if provided
  const cleanPath = path && !path.startsWith("/") ? `/${path}` : path
  return `${AZURACAST_CONFIG.baseUrl}/public/${AZURACAST_CONFIG.stationId}${cleanPath}`
}

export const API_ENDPOINTS = {
  nowPlaying: `/nowplaying/${AZURACAST_CONFIG.stationId}`,
  station: `/station/${AZURACAST_CONFIG.stationId}`,
  schedule: `/station/${AZURACAST_CONFIG.stationId}/schedule`,
  requests: `/station/${AZURACAST_CONFIG.stationId}/requests`,
  podcasts: `/station/${AZURACAST_CONFIG.stationId}/podcasts`,
  listeners: `/station/${AZURACAST_CONFIG.stationId}/listeners`,
  history: `/station/${AZURACAST_CONFIG.stationId}/history`,
}
