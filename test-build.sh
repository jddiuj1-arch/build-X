#!/bin/bash

# Test Build Script for Build X
echo "🧪 اختبار بناء تطبيق Build X..."

# Check if app is running
echo "📡 فحص حالة الخادم..."
if curl -s http://localhost:12002 > /dev/null; then
    echo "✅ الخادم يعمل على المنفذ 12002"
else
    echo "❌ الخادم لا يعمل، بدء تشغيله..."
    npm start -- --web --port 12002 > server.log 2>&1 &
    sleep 10
fi

# Test web version
echo "🌐 اختبار النسخة الويب..."
if curl -s http://localhost:12002 | grep -q "Build X"; then
    echo "✅ النسخة الويب تعمل بنجاح"
else
    echo "⚠️ قد تكون هناك مشكلة في النسخة الويب"
fi

# Check build files
echo "📁 فحص ملفات البناء..."
if [ -f "build-apk.sh" ]; then
    echo "✅ سكريبت بناء APK موجود"
else
    echo "❌ سكريبت بناء APK مفقود"
fi

if [ -f "build-appimage.sh" ]; then
    echo "✅ سكريبت بناء AppImage موجود"
else
    echo "❌ سكريبت بناء AppImage مفقود"
fi

if [ -f "eas.json" ]; then
    echo "✅ ملف إعدادات EAS موجود"
else
    echo "❌ ملف إعدادات EAS مفقود"
fi

# Check dependencies
echo "📦 فحص التبعيات..."
if npm list @react-native-async-storage/async-storage > /dev/null 2>&1; then
    echo "✅ AsyncStorage مثبت"
else
    echo "❌ AsyncStorage غير مثبت"
fi

if npm list @expo/vector-icons > /dev/null 2>&1; then
    echo "✅ Vector Icons مثبت"
else
    echo "❌ Vector Icons غير مثبت"
fi

# Check app structure
echo "🏗️ فحص هيكل التطبيق..."
if [ -f "src/services/AIService.js" ]; then
    echo "✅ خدمة AI موجودة"
else
    echo "❌ خدمة AI مفقودة"
fi

if [ -f "src/screens/APISettingsScreen.js" ]; then
    echo "✅ شاشة إعدادات API موجودة"
else
    echo "❌ شاشة إعدادات API مفقودة"
fi

if [ -f "src/screens/ChatScreenNew.js" ]; then
    echo "✅ شاشة المحادثة الجديدة موجودة"
else
    echo "❌ شاشة المحادثة الجديدة مفقودة"
fi

echo ""
echo "🎉 انتهى الاختبار!"
echo "📱 التطبيق متاح على: http://localhost:12002"
echo "📖 راجع BUILD_INSTRUCTIONS.md للتعليمات المفصلة"