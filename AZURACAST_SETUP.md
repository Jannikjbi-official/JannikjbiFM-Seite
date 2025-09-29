# AzuraCast Setup für jannikjbiFM

## 🎯 Wo du deine AzuraCast-Daten einträgst

Alle AzuraCast-Einstellungen werden zentral in der Datei `lib/azuracast-config.ts` verwaltet.

### 📝 Schritt-für-Schritt Anleitung:

1. **Öffne die Datei:** `lib/azuracast-config.ts`

2. **Trage deine Daten ein:**
   \`\`\`typescript
   export const AZURACAST_CONFIG = {
     // Deine AzuraCast Server URL (WICHTIG: ohne / am Ende)
     baseUrl: "https://deine-domain.de",  // ← HIER ÄNDERN
     
     // Deine Station ID (meist 1 für die erste Station)
     stationId: "1",  // ← HIER ÄNDERN falls nötig
     
     // Optional: API Key für Admin-Features
     apiKey: "dein-api-key",  // ← HIER EINTRAGEN falls gewünscht
     
     // Stream URL wird automatisch generiert
     fallbackStreamUrl: "https://deine-domain.de/radio/8000/radio.mp3",  // ← HIER ÄNDERN
     
     // Station Name
     stationName: "jannikjbiFM",  // ← HIER ÄNDERN falls gewünscht
   }
   \`\`\`

### 🔧 Wie findest du deine AzuraCast-Daten?

#### **Server URL:**
- Deine AzuraCast-Installation URL
- Beispiele: 
  - `https://radio.jannikjbifm.de`
  - `https://123.456.789.123:8443`
  - `https://mein-server.com`

#### **Station ID:**
- Gehe zu deinem AzuraCast Admin Panel
- Klicke auf "Stations"
- Die ID steht in der URL: `/admin/stations/1` → Station ID ist `1`

#### **API Key (Optional):**
- AzuraCast Admin Panel → "Administration" → "API Keys"
- Klicke "Add API Key"
- Wähle die gewünschten Berechtigungen
- Kopiere den generierten Key

#### **Stream URL:**
- Format: `https://deine-domain.de/radio/PORT/MOUNT`
- Standard Port: `8000`
- Standard Mount: `radio.mp3`
- Beispiel: `https://radio.jannikjbifm.de/radio/8000/radio.mp3`

### 🚀 Nach der Konfiguration:

1. **Speichere die Datei**
2. **Deploye die Website neu** (auf Vercel)
3. **Teste die Integration** auf der Live-Seite

### ✅ Funktionen die dann verfügbar sind:

- ✅ **Live Player** mit echten Song-Daten
- ✅ **Hörer-Statistiken** in Echtzeit
- ✅ **Song-Historie** und "Als nächstes"
- ✅ **Song Requests** (falls in AzuraCast aktiviert)
- ✅ **Live DJ-Informationen**
- ✅ **Album-Cover** automatisch
- ✅ **Detaillierte Statistiken** auf `/stats`

### 🔍 Troubleshooting:

**Problem:** 404-Fehler oder "Offline Modus"
- ✅ Prüfe die `baseUrl` (ohne `/` am Ende)
- ✅ Stelle sicher, dass AzuraCast läuft
- ✅ Prüfe CORS-Einstellungen in AzuraCast

**Problem:** Keine Song-Daten
- ✅ Prüfe die Station ID
- ✅ Stelle sicher, dass die Station online ist
- ✅ Prüfe die API-Berechtigung

**Problem:** Stream spielt nicht ab
- ✅ Prüfe die `fallbackStreamUrl`
- ✅ Teste die Stream-URL direkt im Browser
- ✅ Prüfe Browser-Autoplay-Einstellungen

### 📞 Support:

Falls du Hilfe brauchst, öffne ein Support-Ticket bei vercel.com/help
