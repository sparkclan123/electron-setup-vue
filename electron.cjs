const path = require("path");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: false, // ❌ ปิด nodeIntegration เพื่อความปลอดภัย
      contextIsolation: true, // ✅ เปิด contextIsolation ป้องกันการเข้าถึงจากเว็บ
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.cjs"), // ✅ ใช้ preload ที่ปลอดภัย
    },
  });

  if (!app.isPackaged) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "dist/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// ✅ ปลอดภัย: ใช้ ipcMain เพื่อให้ Renderer ติดต่อ Main Process
ipcMain.handle("open-dialog", async () => {
  return await dialog.showOpenDialog({ properties: ["openFile"] });
});
