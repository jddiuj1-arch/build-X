#!/bin/bash

# Build X AppImage Builder Script
# This script builds the AppImage for Linux desktop

echo "🐧 بدء بناء AppImage لتطبيق Build X..."

# Create build directory
mkdir -p build/linux

# Install Electron dependencies
echo "📦 تثبيت Electron..."
npm install --save-dev electron electron-builder

# Create Electron main process file
cat > build/linux/main.js << 'EOF'
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: false
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    title: 'Build X - AI Assistant'
  });

  // Load the web version
  mainWindow.loadURL('http://localhost:12002');
  
  // Remove menu bar
  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
EOF

# Create package.json for Electron
cat > build/linux/package.json << 'EOF'
{
  "name": "build-x",
  "version": "1.0.0",
  "description": "Build X - AI Assistant Desktop App",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder",
    "dist": "electron-builder --linux AppImage"
  },
  "build": {
    "appId": "com.buildx.app",
    "productName": "Build X",
    "directories": {
      "output": "dist"
    },
    "linux": {
      "target": "AppImage",
      "category": "Utility"
    }
  },
  "devDependencies": {
    "electron": "^latest",
    "electron-builder": "^latest"
  }
}
EOF

# Copy icon
cp assets/icon.png build/linux/assets/ 2>/dev/null || echo "⚠️ Icon not found, using default"

# Install dependencies and build
cd build/linux
npm install
npm run dist

echo "✅ تم الانتهاء من بناء AppImage!"
echo "📁 يمكنك العثور على AppImage في: build/linux/dist/"