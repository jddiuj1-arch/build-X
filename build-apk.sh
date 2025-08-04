#!/bin/bash

# Build X APK Builder Script (Legacy - now uses local build)
# This script now redirects to local APK building

echo "🚀 بدء بناء APK لتطبيق Build X..."
echo "ℹ️  تم إزالة ربط EAS - سيتم استخدام البناء المحلي"

# Check if user wants to use local build
echo "🔄 تحويل إلى البناء المحلي..."
./build-apk-local.sh