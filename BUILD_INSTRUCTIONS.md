# تعليمات البناء - Build X

## 📱 بناء APK للأندرويد

### المتطلبات:
- Node.js 18+
- npm أو yarn
- حساب Expo

### الخطوات:
1. تثبيت التبعيات:
```bash
npm install
```

2. بناء APK:
```bash
npm run build:apk
```

أو يدوياً:
```bash
# تثبيت EAS CLI
npm install -g @expo/eas-cli

# تسجيل الدخول
eas login

# إعداد البناء
eas build:configure

# بناء APK
eas build --platform android --profile preview
```

## 🐧 بناء AppImage للينكس

### المتطلبات:
- Node.js 18+
- npm أو yarn
- Linux OS (أو WSL على Windows)

### الخطوات:
1. تشغيل الخادم المحلي:
```bash
npm start
```

2. في terminal آخر، بناء AppImage:
```bash
npm run build:appimage
```

## 🌐 تشغيل النسخة التجريبية

```bash
npm start -- --web --port 12002
```

ثم افتح: http://localhost:12002

## 🔧 إعداد API

1. افتح التطبيق
2. اذهب إلى القائمة الجانبية
3. اختر "إعدادات API"
4. أدخل مفاتيح API:
   - OpenAI API Key
   - Google AI API Key

## 📋 الميزات المتاحة

- ✅ تسجيل الدخول والضيف
- ✅ واجهة عربية كاملة RTL
- ✅ نظام النقاط
- ✅ المحادثة مع AI
- ✅ رفع الصور والملفات
- ✅ تحليل الصور بـ AI
- ✅ حفظ المحادثات محلياً
- ✅ إعدادات API آمنة
- ✅ قائمة جانبية تفاعلية
- ✅ دعم الإعلانات (جاهز للتفعيل)

## 🔐 الأمان

- جميع مفاتيح API محفوظة محلياً
- لا يتم إرسال البيانات لخوادم خارجية
- التشفير المحلي للبيانات الحساسة
- حماية من XSS و CSRF

## 🚀 النشر

### للأندرويد:
- APK جاهز للتوزيع
- يمكن رفعه على Google Play Store

### للينكس:
- AppImage جاهز للتشغيل
- يعمل على جميع توزيعات Linux

### للويب:
- يمكن نشره على أي خادم ويب
- دعم PWA جاهز

## 📞 الدعم

للمساعدة أو الإبلاغ عن مشاكل، يرجى إنشاء issue في المستودع.