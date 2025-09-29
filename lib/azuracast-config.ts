// AzuraCast Konfiguration für jannikjbiFM
// Hier trägst du deine echten AzuraCast-Daten ein

export const AZURACAST_CONFIG = {
  // Deine AzuraCast Server URL (ohne / am Ende)
  // Beispiel: "https://radio.jannikjbifm.de" oder "https://your-server.com:8443"
  baseUrl: "https://admin.jannikjbi.de",

  // Deine Station ID (meist 1 für die erste Station)
  stationId: "1",

  // Optional: API Key für erweiterte Funktionen (Admin-Features)
  // Findest du in AzuraCast unter Administration > API Keys
  apiKey: "cd56afcd0eb2c77a:8c34b2fa738b7dd7b2833cd8012521b0", // Leer lassen wenn nicht benötigt

  // Stream URLs (werden automatisch von AzuraCast generiert)
  // Format: https://your-server.com:8000/radio.mp3
  fallbackStreamUrl: "https://admin.jannikjbi.de/listen/jannikjbifm/radio.mp3",

  // Station Name
  stationName: "jannikjbiFM",

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

// Hilfsfunktionen für URL-Generierung
export function getStreamUrl(mount = "radio.mp3") {
  return `${AZURACAST_CONFIG.baseUrl}/radio/8000/${mount}`
}

export function getApiUrl(endpoint: string) {
  return `${AZURACAST_CONFIG.baseUrl}/api${endpoint}`
}

export function getPublicUrl(path = "") {
  return `${AZURACAST_CONFIG.baseUrl}${path}`
}
