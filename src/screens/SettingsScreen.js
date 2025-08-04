import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  Modal,
  Dimensions,
  StatusBar,
  Animated,
  Vibration,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const SettingsScreen = ({ navigation, route }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [language, setLanguage] = useState('العربية');
  const [cacheSize, setCacheSize] = useState('98 MB');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  const { userType, email, name, userPoints } = route.params || {};

  useEffect(() => {
    loadSettings();
    calculateCacheSize();
  }, []);

  const loadSettings = async () => {
    try {
      const savedDarkMode = await AsyncStorage.getItem('darkMode');
      const savedNotifications = await AsyncStorage.getItem('notifications');
      const savedAutoSave = await AsyncStorage.getItem('autoSave');
      const savedLanguage = await AsyncStorage.getItem('language');

      if (savedDarkMode !== null) setDarkMode(JSON.parse(savedDarkMode));
      if (savedNotifications !== null) setNotifications(JSON.parse(savedNotifications));
      if (savedAutoSave !== null) setAutoSave(JSON.parse(savedAutoSave));
      if (savedLanguage !== null) setLanguage(savedLanguage);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const calculateCacheSize = async () => {
    // محاكاة حساب حجم الذاكرة المؤقتة
    const randomSize = Math.floor(Math.random() * 200) + 50;
    setCacheSize(`${randomSize} MB`);
  };

  const clearCache = () => {
    Alert.alert(
      'مسح ذاكرة التخزين المؤقت',
      'هل أنت متأكد من مسح جميع البيانات المؤقتة؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'مسح',
          style: 'destructive',
          onPress: async () => {
            try {
              // مسح البيانات المؤقتة (محاكاة)
              setCacheSize('0 MB');
              Alert.alert('تم', 'تم مسح ذاكرة التخزين المؤقت بنجاح');
              setTimeout(() => calculateCacheSize(), 2000);
            } catch (error) {
              Alert.alert('خطأ', 'حدث خطأ أثناء مسح الذاكرة المؤقتة');
            }
          }
        }
      ]
    );
  };

  const shareApp = async () => {
    try {
      const { Share } = require('react-native');
      await Share.share({
        message: 'جرب تطبيق Build X - مساعد الذكي الاصطناعي الأفضل!\n\nحمل التطبيق الآن: https://buildx.app',
        title: 'Build X - مساعد الذكي الاصطناعي'
      });
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء المشاركة');
    }
  };

  const rateApp = () => {
    Alert.alert(
      'تقييم التطبيق',
      'شكراً لاستخدامك Build X! هل تود تقييم التطبيق؟',
      [
        { text: 'لاحقاً', style: 'cancel' },
        {
          text: 'تقييم',
          onPress: () => {
            // فتح متجر التطبيقات للتقييم
            Alert.alert('شكراً!', 'سيتم توجيهك لمتجر التطبيقات');
          }
        }
      ]
    );
  };

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const themes = [
    { id: 'light', name: 'فاتح', icon: 'sunny-outline' },
    { id: 'dark', name: 'داكن', icon: 'moon-outline' },
    { id: 'auto', name: 'اتباع النظام', icon: 'phone-portrait-outline' },
  ];

  const settingsGroups = [
    {
      title: 'الحساب والملف الشخصي',
      items: [
        {
          icon: 'person-outline',
          title: 'الحساب',
          subtitle: userType === 'guest' ? 'ضيف' : (name || email),
          onPress: () => navigation.navigate('AccountSettings', { userType, email, name, userPoints }),
          showArrow: true,
        },
        {
          icon: 'card-outline',
          title: 'الاشتراك',
          subtitle: 'Free Plan',
          onPress: () => navigation.navigate('Upgrade'),
          showArrow: true,
        },
      ]
    },
    {
      title: 'التخصيص',
      items: [
        {
          icon: 'moon-outline',
          title: 'المظهر',
          subtitle: 'اتباع النظام',
          onPress: () => setShowThemeModal(true),
          showArrow: true,
        },
        {
          icon: 'globe-outline',
          title: 'اللغة',
          subtitle: language,
          onPress: () => setShowLanguageModal(true),
          showArrow: true,
        },
        {
          icon: 'notifications-outline',
          title: 'الإشعارات',
          subtitle: notifications ? 'مفعلة' : 'معطلة',
          rightComponent: (
            <Switch
              value={notifications}
              onValueChange={(value) => {
                setNotifications(value);
                saveSettings('notifications', value);
              }}
              trackColor={{ false: '#ccc', true: '#ff6b35' }}
              thumbColor={notifications ? '#fff' : '#f4f3f4'}
            />
          ),
        },
      ]
    },
    {
      title: 'الميزات المتقدمة',
      items: [
        {
          icon: 'flask-outline',
          title: 'مختبر الميزات',
          subtitle: 'ميزات تجريبية',
          onPress: () => navigation.navigate('FeatureLab'),
          showArrow: true,
        },
        {
          icon: 'settings-outline',
          title: 'إعدادات API',
          subtitle: 'تكوين الذكي الاصطناعي',
          onPress: () => navigation.navigate('APISettings'),
          showArrow: true,
        },
        {
          icon: 'shield-outline',
          title: 'ضوابط البيانات',
          subtitle: 'الخصوصية والأمان',
          onPress: () => navigation.navigate('DataControls'),
          showArrow: true,
        },
        {
          icon: 'desktop-outline',
          title: 'متصفح السحابية',
          subtitle: 'إدارة الملفات',
          onPress: () => navigation.navigate('CloudBrowser'),
          showArrow: true,
        },
      ]
    },
    {
      title: 'التخزين والأداء',
      items: [
        {
          icon: 'save-outline',
          title: 'الحفظ التلقائي',
          subtitle: autoSave ? 'مفعل' : 'معطل',
          rightComponent: (
            <Switch
              value={autoSave}
              onValueChange={(value) => {
                setAutoSave(value);
                saveSettings('autoSave', value);
              }}
              trackColor={{ false: '#ccc', true: '#ff6b35' }}
              thumbColor={autoSave ? '#fff' : '#f4f3f4'}
            />
          ),
        },
        {
          icon: 'trash-outline',
          title: 'مسح ذاكرة التخزين المؤقت',
          subtitle: cacheSize,
          onPress: clearCache,
          showArrow: true,
          isDestructive: true,
        },
      ]
    },
    {
      title: 'المساعدة والدعم',
      items: [
        {
          icon: 'share-outline',
          title: 'شارك التطبيق',
          subtitle: 'أخبر أصدقائك عن Build X',
          onPress: shareApp,
          showArrow: true,
        },
        {
          icon: 'heart-outline',
          title: 'قيم التطبيق',
          subtitle: 'ساعدنا في التحسين',
          onPress: rateApp,
          showArrow: true,
        },
        {
          icon: 'help-circle-outline',
          title: 'المساعدة والدعم',
          subtitle: 'الأسئلة الشائعة',
          onPress: () => navigation.navigate('HelpSupport'),
          showArrow: true,
        },
        {
          icon: 'information-circle-outline',
          title: 'حول التطبيق',
          subtitle: 'الإصدار 1.0.0',
          onPress: () => navigation.navigate('AboutApp'),
          showArrow: true,
        },
      ]
    },
  ];

  const renderSettingItem = (item, index) => {
    const [scaleValue] = useState(new Animated.Value(1));
    
    const handlePress = () => {
      // تأثير الاهتزاز الخفيف
      Vibration.vibrate(10);
      
      // تأثير الضغط
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      
      // تنفيذ الوظيفة
      if (item.onPress) {
        setTimeout(() => item.onPress(), 150);
      }
    };

    return (
      <Animated.View
        key={index}
        style={[
          styles.settingItemContainer,
          { transform: [{ scale: scaleValue }] }
        ]}
      >
        <TouchableOpacity
          style={[
            styles.settingItem,
            item.isDestructive && styles.destructiveItem
          ]}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <View style={styles.settingItemLeft}>
            <View style={[
              styles.iconContainer,
              item.isDestructive && styles.destructiveIconContainer
            ]}>
              <Ionicons 
                name={item.icon} 
                size={22} 
                color={item.isDestructive ? "#ff4757" : "#ff6b35"} 
              />
            </View>
            <View style={styles.settingItemText}>
              <Text style={[
                styles.settingTitle,
                item.isDestructive && styles.destructiveTitle
              ]}>
                {item.title}
              </Text>
              {item.subtitle && (
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              )}
            </View>
          </View>
          <View style={styles.settingItemRight}>
            {item.rightComponent || (
              item.showArrow && (
                <Ionicons 
                  name="chevron-back" 
                  size={18} 
                  color={item.isDestructive ? "#ff4757" : "#ccc"} 
                />
              )
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-forward" size={24} color="#2c2c2c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>الإعدادات</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {userType === 'guest' ? 'ض' : (name ? name.charAt(0) : email?.charAt(0) || 'U')}
              </Text>
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>
                {userType === 'guest' ? 'ضيف' : (name || email)}
              </Text>
              {userType !== 'guest' && email && (
                <Text style={styles.profileEmail}>{email}</Text>
              )}
              <View style={styles.planBadge}>
                <Text style={styles.planText}>Free Plan</Text>
              </View>
            </View>
          </View>
          <View style={styles.pointsContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.pointsText}>{userPoints || 0}</Text>
          </View>
        </View>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupContainer}>
              {group.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
            </View>
          </View>
        ))}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Language Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>اختر اللغة</Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {languages.map((lang, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => {
                  setLanguage(lang.name);
                  saveSettings('language', lang.name);
                  setShowLanguageModal(false);
                }}
              >
                <Text style={styles.modalItemFlag}>{lang.flag}</Text>
                <Text style={styles.modalItemText}>{lang.name}</Text>
                {language === lang.name && (
                  <Ionicons name="checkmark" size={20} color="#ff6b35" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Theme Modal */}
      <Modal
        visible={showThemeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowThemeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>اختر المظهر</Text>
              <TouchableOpacity onPress={() => setShowThemeModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {themes.map((theme, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => {
                  setShowThemeModal(false);
                  Alert.alert('المظهر', `تم اختيار المظهر: ${theme.name}`);
                }}
              >
                <Ionicons name={theme.icon} size={20} color="#666" />
                <Text style={styles.modalItemText}>{theme.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c2c2c',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 24,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff6b35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  planBadge: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
  planText: {
    fontSize: 12,
    color: '#0277bd',
    fontWeight: 'bold',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8e1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffecb3',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f57f17',
    marginLeft: 4,
  },
  settingsGroup: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 12,
    marginHorizontal: 20,
    textAlign: 'right',
  },
  groupContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  settingItemContainer: {
    marginHorizontal: 2,
    marginVertical: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  destructiveItem: {
    backgroundColor: '#fff8f8',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff5f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  destructiveIconContainer: {
    backgroundColor: '#fff0f0',
    shadowColor: '#ff4757',
  },
  settingItemText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 17,
    color: '#2c2c2c',
    fontWeight: '600',
    textAlign: 'right',
    letterSpacing: 0.3,
  },
  destructiveTitle: {
    color: '#ff4757',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
    textAlign: 'right',
    opacity: 0.8,
  },
  settingItemRight: {
    marginLeft: 12,
  },
  bottomSpacing: {
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c2c2c',
    letterSpacing: 0.3,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  modalItemFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  modalItemText: {
    fontSize: 16,
    color: '#2c2c2c',
    flex: 1,
    textAlign: 'right',
  },
});

export default SettingsScreen;