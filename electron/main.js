const { app, BrowserWindow, ipcMain, clipboard } = require("electron")
const path = require("path")
const fs = require("fs")
const isDev = process.env.NODE_ENV === "development"

// Chemin pour stocker les données
const userDataPath = app.getPath("userData")
const dataFilePath = path.join(userDataPath, "code-wallet-data.json")

// Initialiser le fichier de données s'il n'existe pas
if (!fs.existsSync(dataFilePath)) {
  const initialData = { fragments: [], tags: [] }
  fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2))
}

// Créer la fenêtre du navigateur
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
    icon: path.join(__dirname, "../resources/icon.png"),
  })

  // Charger l'index.html
  if (isDev) {
    // En mode développement, on charge depuis le serveur Vite
    mainWindow.loadURL("http://localhost:5173")
    mainWindow.webContents.openDevTools()
  } else {
    // En production, on charge le fichier HTML compilé
    // Utiliser le chemin absolu pour être sûr
    const indexPath = path.join(__dirname, "..", "dist", "index.html")
    mainWindow.loadFile(indexPath)
    
    // Pour déboguer en production, décommentez cette ligne
    // mainWindow.webContents.openDevTools()
  }
}

// Quand Electron est prêt
app.whenReady().then(() => {
  createWindow()

  app.on("activate", () => {
    // Sur macOS, il est courant de recréer une fenêtre lorsque
    // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres ouvertes
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quitter quand toutes les fenêtres sont fermées
app.on("window-all-closed", () => {
  // Sur macOS, il est courant que les applications restent actives
  // jusqu'à ce que l'utilisateur quitte explicitement avec Cmd + Q
  if (process.platform !== "darwin") app.quit()
})

// Gestionnaires IPC pour les opérations de données
ipcMain.handle("get-data", () => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier de données:", error)
    return { fragments: [], tags: [] }
  }
})

ipcMain.handle("save-data", (event, data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error("Erreur lors de l'écriture du fichier de données:", error)
    return false
  }
})

ipcMain.handle("copy-to-clipboard", (event, text) => {
  clipboard.writeText(text)
  return true
})