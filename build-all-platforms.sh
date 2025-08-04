#!/bin/bash

# Build X Multi-Platform Builder Script
# This script builds the app for multiple platforms locally

echo "🚀 بدء بناء Build X لجميع المنصات..."

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Install dependencies
echo "📦 تثبيت التبعيات..."
npm install

# Build for Web
echo "🌐 بناء للويب..."
if npm run build:web; then
    echo "✅ تم بناء الويب بنجاح!"
else
    echo "❌ فشل بناء الويب"
fi

# Build APK (Android)
echo "📱 بناء APK للأندرويد..."
if command_exists adb && command_exists java; then
    if ./build-apk-local.sh; then
        echo "✅ تم بناء APK بنجاح!"
    else
        echo "❌ فشل بناء APK"
    fi
else
    echo "⚠️  تخطي بناء Android - البيئة غير مهيأة"
fi

# Build AppImage (Linux Desktop)
echo "🖥️  بناء AppImage للديسكتوب..."
if ./build-appimage.sh; then
    echo "✅ تم بناء AppImage بنجاح!"
else
    echo "❌ فشل بناء AppImage"
fi

# Build Electron (if electron is available)
echo "⚡ بناء Electron..."
if command_exists electron; then
    if npm run build:electron; then
        echo "✅ تم بناء Electron بنجاح!"
    else
        echo "❌ فشل بناء Electron"
    fi
else
    echo "⚠️  تخطي بناء Electron - غير مثبت"
fi

echo "🎉 انتهى بناء جميع المنصات المتاحة!"
echo ""
echo "📋 ملخص النتائج:"
echo "   🌐 الويب: dist/"
echo "   📱 Android APK: build-x-release.apk"
echo "   🖥️  AppImage: dist/"
echo "   ⚡ Electron: متاح للتشغيل"