#!/bin/bash

# Build X Local APK Builder Script
# This script builds APK locally without EAS

echo "🚀 بدء بناء APK محلياً لتطبيق Build X..."

# Check if we have Android development environment
if ! command -v adb &> /dev/null; then
    echo "⚠️  تحذير: Android SDK غير مثبت. يرجى تثبيت Android Studio أولاً."
    echo "📖 راجع: https://reactnative.dev/docs/environment-setup"
    exit 1
fi

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "⚠️  تحذير: Java غير مثبت. يرجى تثبيت JDK أولاً."
    exit 1
fi

# Install dependencies if needed
echo "📦 تثبيت التبعيات..."
npm install

# Generate native code if needed
echo "🔧 إنشاء الكود الأصلي..."
if [ ! -d "android" ]; then
    echo "📱 إنشاء مجلد Android..."
    npx expo prebuild --platform android
fi

# Build APK using React Native CLI
echo "🔨 بناء APK باستخدام React Native CLI..."
cd android

# Clean previous builds
echo "🧹 تنظيف البناءات السابقة..."
./gradlew clean

# Build release APK
echo "📦 بناء APK الإصدار النهائي..."
./gradlew assembleRelease

# Check if build was successful
if [ -f "app/build/outputs/apk/release/app-release.apk" ]; then
    echo "✅ تم بناء APK بنجاح!"
    echo "📁 مسار الملف: android/app/build/outputs/apk/release/app-release.apk"
    
    # Copy APK to root directory for easy access
    cp app/build/outputs/apk/release/app-release.apk ../build-x-release.apk
    echo "📋 تم نسخ APK إلى: build-x-release.apk"
else
    echo "❌ فشل في بناء APK!"
    exit 1
fi

cd ..
echo "🎉 انتهى بناء APK المحلي بنجاح!"