import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Linking,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AIService from '../services/AIService';

const { width, height } = Dimensions.get('window');

const SideMenu = ({ userType, email, name, userPoints, onClose, navigation }) => {
  const handleLogout = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من تسجيل الخروج؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'تسجيل الخروج', 
          onPress: () => {
            onClose();
            navigation.navigate('Login');
          }
        }
      ]
    );
  };

  const menuItems = [
    {
      icon: 'link-outline',
      title: 'شارك مع صديق',
      onPress: () => {
        Alert.alert('مشاركة', 'سيتم إضافة هذه الميزة قريباً');
        onClose();
      }
    },
    {
      icon: 'calendar-outline',
      title: 'المهام المجدولة',
      onPress: () => {
        Alert.alert('المهام المجدولة', 'سيتم إضافة هذه الميزة قريباً');
        onClose();
      }
    },
    {
      icon: 'book-outline',
      title: 'معرفة',
      onPress: () => {
        Alert.alert('المعرفة', 'سيتم إضافة هذه الميزة قريباً');
        onClose();
      }
    },
    {
      icon: 'flask-outline',
      title: 'مختبر الميزات',
      onPress: () => {
        Alert.alert('مختبر الميزات', 'سيتم إضافة هذه الميزة قريباً');
        onClose();
      }
    },
    {
      icon: 'shield-outline',
      title: 'ضوابط البيانات',
      onPress: () => {
        Alert.alert('ضوابط البيانات', 'سيتم إضافة هذه الميزة قريباً');
        onClose();
      }
    },
    {
      icon: 'desktop-outline',
      title: 'متصفح السحابية',
      onPress: () => {
        Alert.alert('متصفح السحابية', 'سيتم إضافة هذه الميزة قريباً');
        onClose();
      }
    },
    {
      icon: 'globe-outline',
      title: 'اللغة',
      subtitle: 'العربية',
      onPress: () => {
        Alert.alert('اللغة', 'سيتم إضافة المزيد من اللغات قريباً');
        onClose();
      }
    },
    {
      icon: 'person-outline',
      title: 'الحساب',
      onPress: () => {
        Alert.alert('الحساب', 'سيتم إضافة إعدادات الحساب قريباً');
        onClose();
      }
    },
    {
      icon: 'settings-outline',
      title: 'إعدادات API',
      onPress: () => {
        onClose();
        navigation.navigate('APISettings');
      }
    },
    {
      icon: 'moon-outline',
      title: 'المظهر',
      subtitle: 'اتباع النظام',
      onPress: () => {
        Alert.alert('المظهر', 'سيتم إضافة خيارات المظهر قريباً');
        onClose();
      }
    },
    {
      icon: 'trash-outline',
      title: 'مسح ذاكرة التخزين المؤقت',
      subtitle: 'MB 98',
      onPress: () => {
        Alert.alert('مسح الذاكرة', 'تم مسح ذاكرة التخزين المؤقت');
        onClose();
      }
    },
  ];

  const additionalItems = [
    {
      icon: 'heart-outline',
      title: 'قيم هذا التطبيق',
      onPress: () => {
        Alert.alert('التقييم', 'شكراً لك! سيتم توجيهك لمتجر التطبيقات');
        onClose();
      }
    },
    {
      icon: 'help-circle-outline',
      title: 'الحصول على مساعدة',
      onPress: () => {
        Alert.alert('المساعدة', 'سيتم إضافة مركز المساعدة قريباً');
        onClose();
      }
    },
  ];

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* User Info */}
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {userType === 'guest' ? 'ض' : (name ? name.charAt(0) : email?.charAt(0) || 'U')}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>
                  {userType === 'guest' ? 'ضيف' : (name || email)}
                </Text>
                {userType !== 'guest' && email && (
                  <Text style={styles.userEmail}>{email}</Text>
                )}
                <View style={styles.planBadge}>
                  <Text style={styles.planText}>Free</Text>
                </View>
              </View>
            </View>

            {/* Points Display */}
            <View style={styles.pointsSection}>
              <View style={styles.pointsRow}>
                <Text style={styles.pointsLabel}>رصيد</Text>
                <View style={styles.pointsValue}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.pointsNumber}>{userPoints}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Build X</Text>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View style={styles.menuItemContent}>
                  <Ionicons name={item.icon} size={20} color="#666" />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                    {item.subtitle && (
                      <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                    )}
                  </View>
                </View>
                <Ionicons name="chevron-back" size={16} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Additional Items */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>معلومات</Text>
            {additionalItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View style={styles.menuItemContent}>
                  <Ionicons name={item.icon} size={20} color="#666" />
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-back" size={16} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          {userType !== 'guest' && (
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#ff4444" />
              <Text style={styles.logoutText}>تسجيل الخروج</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 8,
  },
  userSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff6b35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  planBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  planText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  pointsSection: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 16,
    color: '#2c2c2c',
    fontWeight: '600',
  },
  pointsValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginLeft: 4,
  },
  menuSection: {
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#999',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'right',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    marginLeft: 16,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#2c2c2c',
    textAlign: 'right',
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    textAlign: 'right',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  logoutText: {
    fontSize: 16,
    color: '#ff4444',
    marginLeft: 12,
    fontWeight: '600',
  },
});

export default SideMenu;