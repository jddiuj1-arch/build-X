#!/bin/bash

# Build X APK Builder Script
# This script builds the APK for the Build X app

echo "🚀 بدء بناء APK لتطبيق Build X..."

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "📦 تثبيت EAS CLI..."
    npm install -g @expo/eas-cli
fi

# Login to Expo (if not already logged in)
echo "🔐 تسجيل الدخول إلى Expo..."
eas login

# Configure EAS build
echo "⚙️ إعداد بناء EAS..."
eas build:configure

# Build APK for Android
echo "🔨 بناء APK للأندرويد..."
eas build --platform android --profile preview

echo "✅ تم الانتهاء من بناء APK!"
echo "📱 يمكنك تحميل APK من Expo Dashboard"