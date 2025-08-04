#!/bin/bash

# Build X Development Starter Script
# This script provides multiple options to start development

echo "🚀 مرحباً بك في Build X Development"
echo ""
echo "اختر طريقة التشغيل:"
echo "1) تشغيل عادي (Expo)"
echo "2) تشغيل مع النفق (Tunnel)"
echo "3) تشغيل للويب فقط"
echo "4) تشغيل للأندرويد"
echo "5) تشغيل لـ iOS"
echo "6) تشغيل Electron"
echo "7) إعداد البيئة الأصلية (Prebuild)"
echo ""

read -p "أدخل اختيارك (1-7): " choice

case $choice in
    1)
        echo "🚀 تشغيل Expo العادي..."
        npm start
        ;;
    2)
        echo "🌐 تشغيل مع النفق..."
        npm run start:tunnel
        ;;
    3)
        echo "🌐 تشغيل للويب..."
        npm run web
        ;;
    4)
        echo "📱 تشغيل للأندرويد..."
        npm run android
        ;;
    5)
        echo "🍎 تشغيل لـ iOS..."
        npm run ios
        ;;
    6)
        echo "⚡ تشغيل Electron..."
        if command -v electron &> /dev/null; then
            npm run build:electron
        else
            echo "❌ Electron غير مثبت. تثبيت..."
            npm install electron
            npm run build:electron
        fi
        ;;
    7)
        echo "🔧 إعداد البيئة الأصلية..."
        npm run prebuild
        ;;
    *)
        echo "❌ اختيار غير صحيح"
        exit 1
        ;;
esac