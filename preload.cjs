const { contextBridge, ipcRenderer } = require("electron");

// ✅ ใช้ contextBridge เพื่อป้องกันการเข้าถึงจาก JavaScript อื่น ๆ
contextBridge.exposeInMainWorld("electronAPI", {
  openDialog: () => ipcRenderer.invoke("open-dialog") // ✅ Renderer จะเรียกใช้ API นี้แทนการใช้ remote
});
