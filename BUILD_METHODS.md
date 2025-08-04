# طرق البناء والتشغيل - Build X

تم إزالة ربط EAS من المشروع وإضافة طرق متعددة للبناء والتشغيل.

## 🚀 طرق التشغيل للتطوير

### 1. التشغيل السريع
```bash
./dev-start.sh
```
سكريبت تفاعلي يوفر جميع خيارات التشغيل.

### 2. طرق التشغيل المباشرة

#### تشغيل عادي (Expo)
```bash
npm start
# أو
expo start
```

#### تشغيل مع النفق
```bash
npm run start:tunnel
```

#### تشغيل للويب
```bash
npm run web
```

#### تشغيل للأندرويد
```bash
npm run android
```

#### تشغيل لـ iOS
```bash
npm run ios
```

## 🔨 طرق البناء

### 1. البناء الشامل لجميع المنصات
```bash
./build-all-platforms.sh
```

### 2. بناء APK محلياً
```bash
npm run build:apk-local
# أو
./build-apk-local.sh
```

### 3. بناء للويب
```bash
npm run build:web
```

### 4. بناء AppImage للديسكتوب
```bash
npm run build:appimage
# أو
./build-appimage.sh
```

### 5. بناء Electron
```bash
npm run build:electron
```

## ⚙️ إعداد البيئة

### إنشاء الكود الأصلي
```bash
npm run prebuild
# أو للتنظيف والإعادة
npm run prebuild:clean
```

### تثبيت التبعيات
```bash
npm install
```

## 📋 متطلبات البناء

### للأندرويد (APK)
- Android Studio
- Android SDK
- Java JDK
- ADB

### لـ iOS
- Xcode (macOS فقط)
- iOS Simulator

### للويب
- متصفح حديث

### للديسكتوب (Electron/AppImage)
- Node.js
- Electron (يتم تثبيته تلقائياً)

## 🔧 استكشاف الأخطاء

### مشكلة في بناء Android
```bash
# تنظيف وإعادة البناء
cd android
./gradlew clean
cd ..
npm run prebuild:clean
```

### مشكلة في التبعيات
```bash
# حذف وإعادة تثبيت
rm -rf node_modules package-lock.json
npm install
```

### مشكلة في Metro
```bash
# إعادة تشغيل Metro
npx react-native start --reset-cache
```

## 📁 مخرجات البناء

- **APK**: `build-x-release.apk`
- **الويب**: `dist/`
- **AppImage**: `dist/`
- **Electron**: يعمل مباشرة

## 🆘 الحصول على المساعدة

إذا واجهت مشاكل:
1. تأكد من تثبيت جميع المتطلبات
2. راجع رسائل الخطأ في Terminal
3. استخدم `npm run prebuild:clean` لإعادة الإعداد
4. تأكد من تحديث Node.js و npm